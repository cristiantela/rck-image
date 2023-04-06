module.exports = function RckImage(image) {
  const img = document.createElement("img");

  img.setAttribute("crossOrigin", "anonymous");

  let name;
  let type;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const list = [
    () => {
      return new Promise((resolve) => {
        img.addEventListener("load", () => {
          canvas.width = img.width;
          canvas.height = img.height;

          context.drawImage(img, 0, 0, canvas.width, canvas.height);

          resolve();
        });

        if (image instanceof File) {
          name = image.name;
          type = image.type;

          img.setAttribute("src", URL.createObjectURL(image));
        } else {
          img.setAttribute("src", image);
        }
      });
    },
  ];

  async function execList() {
    let response;

    for (let item of list) {
      response = await item();
    }

    return response;
  }

  const fn = {
    resize({ size } = {}) {
      list.push(() => {
        return new Promise((resolve) => {
          if (size) {
            let width = img.width;
            let height = img.height;

            if (width > size && height > size) {
              if (height < width) {
                width = (size / height) * width;
                height = size;
              } else if (width <= height) {
                height = (size / width) * height;
                width = size;
              }
            }

            canvas.width = width;
            canvas.height = height;

            context.drawImage(img, 0, 0, width, height);

            resolve();
          } else {
            resolve();
          }
        });
      });

      return fn;
    },

    file({ type: t, quality = 1 } = {}) {
      list.push(() => {
        return new Promise((resolve) => {
          canvas.toBlob(
            (file) => {
              resolve(
                new File([file], name, {
                  type: file.type,
                })
              );
            },
            t || type,
            quality
          );
        });
      });

      return execList();
    },

    async dataURL({ type: t, quality = 1 } = {}) {
      await execList();

      return canvas.toDataURL(t || type, quality);
    },
  };

  return fn;
};
