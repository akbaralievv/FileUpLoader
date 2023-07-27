import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const File = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...acceptedFiles]);
  }, []);

  const removeFile = (index) => {
    setSelectedFiles((prevSelectedFiles) => {
      const updatedFiles = [...prevSelectedFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '*',
    multiple: true,
    maxSize: 100 * 1024 * 1024,
  });

  return (
    <div>
      <h2>Загрузка файлов на Яндекс.Диск (1-100 файлов)</h2>
      <div
        {...getRootProps()}
        style={{ width: '400px', height: '50px', border: '1px solid black' }}>
        <input {...getInputProps()} />
        <p style={{ textAlign: 'center' }}>Перетащите файлы сюда или нажмите чтобы выбрать файлы</p>
      </div>
      <div>
        {selectedFiles.length > 0 && (
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>
                {file.name} ({file.size} bytes){' '}
                <button onClick={() => removeFile(index)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default File;
