import { classNames } from '@codelab/lib';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { useDropzone, DropzoneProps } from 'react-dropzone';

interface IProps extends DropzoneProps {
  dndText?: React.ReactNode;
  preview?: boolean;
}

export const ClDropzone = ({ preview = true, dndText = 'Drop some files', ...rest }: IProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      ...rest,
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ),
        );
      },
    });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const dropzoneClasses = classNames(
    'dropzone',
    isFocused ? 'focused' : '',
    isDragAccept ? 'accepted' : '',
    isDragReject ? 'rejected' : '',
  );


  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));


  return (
    <section className='container'>
      <div {...getRootProps({ className: dropzoneClasses })}>
        <input {...getInputProps()} />
        {dndText && <div>{dndText}</div>}
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
};
