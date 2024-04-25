export class ConvertirImagen {
    static fileToBase64(file, callback) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        callback(reader.result);
      };
      reader.onerror = (error) => {
        console.error('Error al convertir el archivo a base64:', error);
      };
    }
  
    static base64ToFile(base64, filename, mimeType) {
      const byteCharacters = atob(base64.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      return new File([blob], filename, { type: mimeType });
    }
  }
  