/* eslint-disable import/no-extraneous-dependencies */
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '~/appRoot/infra/utils/crop-image';
import { Button } from '../button';

interface Image {
  base64: string;
  type: string;
}

interface Props {
  userPhotoModalOpen: boolean;
  setUserPhotoModalOpen: (arg: boolean) => void;
  image: Image;
  setImage: Dispatch<SetStateAction<Image>>;
  type: string;
}

interface cropProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ReactImageCrop: React.FC<Props> = ({ image }) => {
  const [extension, setExtension] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [croppedArea, setCroppedArea] = useState<cropProps>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  const saveCroppedImage = useCallback(async () => {
    try {
      const croppedImageResponse = await getCroppedImg(
        selectedImage,
        croppedArea,
        rotation,
      );
      const imageProps: Image = {
        base64: String(croppedImageResponse),
        type: extension,
      };
      setImage(imageProps);
      setUserPhotoModalOpen(false);
    } catch (e: any) {
      return e;
    }

    // eslint-disable-next-line
  }, [image, croppedArea, setUserPhotoModalOpen, extension]);

  return (
    <div>
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={385 / 385}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />

      <Button variant='solid' color='primary' onClick={saveCroppedImage}>
        Aplicar
      </Button>
    </div>
  );
};

export default ReactImageCrop;
