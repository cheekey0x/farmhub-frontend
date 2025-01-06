export async function getImageFileFromUrl(imageUrl: string, filename: string) {
  try {
    // Fetch the image data
    const response = await fetch(imageUrl);
    const imageData = await response.blob();

    // Create a File object
    const file = new File([imageData], filename, { type: imageData.type });

    return file;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

export const readFileAsBytes = (file: File): Promise<Uint8Array> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        const arrayBuffer = reader.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        resolve(uint8Array);
      } else {
        reject(new Error("Failed to read file as ArrayBuffer."));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading the file."));
    };

    reader.readAsArrayBuffer(file);
  });

export const uint8ArrayToBase64 = (uint8Array: Uint8Array): string => {
  let binaryString = "";

  uint8Array.forEach((byte) => {
    binaryString += String.fromCharCode(byte);
  });

  return btoa(binaryString);
};

export const getFileFromUrl = async (
  url: string,
  filename: string
): Promise<File> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data: Blob = await response.blob();

    // Create a File instance from the blob
    const file = new File([data], filename, {
      type: data.type
    });

    return file;
  } catch (error) {
    console.error("Error fetching file:", error);
    throw error;
  }
};
