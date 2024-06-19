// saveBase64ImageToFile
export const saveBase64ImageToFile = async (base64String, filePath) => {
   try {
      const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')

      await fs.promises.writeFile(filePath, buffer) // Utilisation de fs.promises pour rendre writeFile asynchrone

      console.log('Image saved successfully.')
   } catch (error) {
      console.error('Error saving the file:', error)
   }
}
