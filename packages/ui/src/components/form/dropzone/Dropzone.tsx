import { classNames } from '@codelab/lib';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { useDropzone, DropzoneProps } from 'react-dropzone';
import Image from 'next/image';
import { Request } from '@codelab/lib';
import { ClProgress } from '../../progress/Progress';
import Error from '../../error/Error';

import { AxiosRequestHeaders } from 'axios';
// TODO:
// ACCEPT GENERIC FOR FILE UPLOAD RESPONSE
// Accept previously uploaded files which will be shown as thumbs, add a cross to remove image. The delete should handle both current and previous files. If current file simply delete from files (usestate) if and send delete function to parent. the parent can be formik dropzone where we will simply set the file values
// Scenarios
// files existing already (i.e updating) User doesn't upload any files nothing to do here as formik input will already set existing files
// Existing files, then new files uploaded. Send uploaded files to parent (already being done using on Files upload). Formik input will append the files
// After that file is deleted, call delete function which is external (formik). Formik will set value of input
interface IProps extends DropzoneProps {
  dndText?: React.ReactNode;
  preview?: boolean;
  uploadConfig?: {
    url: string;
    method: 'post' | 'put' | 'patch';
    headers: AxiosRequestHeaders;
  };
  onFilesUpload?: (files: File[] | string[]) => void;
  error?: string;
  hasError?: boolean;
}

interface IPreviewFile extends File {
  preview: string;
}

export const ClDropzone = ({
  uploadConfig,
  preview = true,
  dndText = 'Drop some files',
  children,
  onFilesUpload,
  hasError,
  error,
  ...rest
}: IProps) => {
  const [percentage, setPercentage] = useState(0);
  const [files, setFiles] = useState<IPreviewFile[]>([]);
  const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        'image/png': ['.png'],
      },
      ...rest,
      onDrop: async (acceptedFiles) => {
        if (uploadConfig) {
          let percent = 0;
          const axios = new Request(uploadConfig.url);
          const config = {
            onUploadProgress: (progressEvent: ProgressEvent) => {
              const { loaded, total } = progressEvent;
              percent = Math.floor((loaded * 100) / total);

              if (percent <= 100) {
                setPercentage(percent); // hook to set the value of current level that needs to be passed to the progressbar
              }
            },
            headers: uploadConfig.headers,
          };

          const filesRes = await axios.sendRequest({
            method: uploadConfig.method,
            url: '',
            multipart: true,
            body: {
              file: acceptedFiles,
            },
            options: config,
          });

          setPercentage(percent);
          setTimeout(() => {
            setPercentage(0);
          }, 1000);
          if (onFilesUpload) onFilesUpload(filesRes.data);
        } else {
          if (onFilesUpload) onFilesUpload(acceptedFiles);
        }
        setFiles(
          acceptedFiles.map((file) => {
            return Object.assign(file, {
              preview: URL.createObjectURL(file),
            });
          }),
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

  const thumbs = files.map((file) => (
    <div
      className='dropzone__thumb position-relative d-flex justify-content-center align-items-center'
      key={file.name}
    >
      {percentage ? (
        <ClProgress showPercentage progress={percentage} className='position-absolute' />
      ) : null}
      <Image
        width={80}
        height={80}
        alt='preview'
        src={file.preview}
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </div>
  ));

  return (
    <section>
      <div {...getRootProps({ className: dropzoneClasses })}>
        <input {...getInputProps()} />
        {dndText && <div>{dndText}</div>}
      </div>
      <aside className='dropzone__thumbs-container'>{thumbs}</aside>
      {hasError && <Error>{error}</Error>}
    </section>
  );
};
