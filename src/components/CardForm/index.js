import React from 'react';
import CardInputs from './cardInputs';
import {
  fileContainerDeleteImageClass,
  fileContainerUploadPictureContainerClass,
  fileContainerUploadPictureContainerimgUploadPictureClass,
  fileContainerUploadPicturesWrapperClass,
} from './styles';
import RImg from 'react-image';

export default ({
                  products,
                  setProducts,
                  filesList,
                  setFiles,
                  index,
                  picture,
                  removeImage = null,
                  update,
                  arrayOfInputs,
                  product,
                  setProduct,
                  colors,
                  sizes,
                }) => {
  return (
    <div style={fileContainerUploadPicturesWrapperClass} className="uploadPicturesWrapper">
      <div key={index} style={fileContainerUploadPictureContainerClass} className="uploadPictureContainer">
        {removeImage && <div style={fileContainerDeleteImageClass} className="deleteImage" onClick={() => removeImage(picture)}>
          X
        </div>}

        <RImg
          src={picture}
          style={fileContainerUploadPictureContainerimgUploadPictureClass}
          className="uploadPicture"
          alt="preview"
          container={children => (
            <CardInputs
              image={children || null}
              index={index}
              products={products}
              setProducts={setProducts}
              filesList={filesList}
              setFiles={setFiles}
              product={product}
              setProduct={setProduct}
              colors={colors}
              sizes={sizes}
              update={update || null}
              arrayOfInputs={arrayOfInputs}
            />
          )}
        />
      </div>
    </div>
  );
};
