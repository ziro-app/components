import React,{useState,useMemo} from 'react';
import CardForm from '../../../components/CardForm/index';
import FormInput from '../../../components/FormInput/index';
import DropDown from '../../../components/Dropdown/index';
import InputText from '../../../components/InputText/index';
import currencyFormat from '@ziro/currency-format';
import { title } from './styles';
import { container } from '@ziro/theme';
import examplePicture from './examplePicture'
import maskInput from '@ziro/mask-input';
const PTstatus = {
  available: 'Disponível',
  unavailable: 'Indisponível',
  closed: 'Disponível',
  waitingInfo: '',
  soldOut: 'Indisponível',
};

const INstatus = {
  Disponível: 'available',
  Indisponível: 'soldOut',
};

export const DisplayCardForm = () => {
  const [product, setProduct] = useState({ status: 'available', });
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const index = 0;
  const [products, setProducts] = useState([{}]);
  const [pictures, setPictures] = React.useState([]);
  const [filesList, setFiles] = React.useState([]);
  function removeImage(picture) {
    const removeIndex = pictures.findIndex(e => e === picture);
    const filteredPictures = pictures.filter((e, index) => index !== removeIndex);
    const filteredFiles = filesList.filter((e, index) => index !== removeIndex);
    const listOfProducts = products.filter((e, index) => index !== removeIndex);

    setProducts(listOfProducts);
    setPictures(filteredPictures);
    setFiles(filteredFiles);
  }

  const availabilityInput = useMemo(
    () => (
      <FormInput
        name="availability"
        label="Disponibilidade"
        input={
          <DropDown
            list={['Disponível', 'Indisponível']}
            value={PTstatus[product.status] || ''}
            onChange={({ target: { value } }) =>
              setProduct(old => ({
                ...old,
                status: INstatus[value] || 'waitingInfo',
              }))
            }
            onChangeKeyboard={element =>
              element &&
              setProduct(old => ({
                ...old,
                status: INstatus[element.value] || 'waitingInfo',
              }))
            }
            placeholder="Está disponível em estoque?"
          />
        }
      />
    ),
    [product.status],
  );

  const priceInput = useMemo(
    () =>
      product.status === 'available' && (
        <FormInput
          name="price"
          label="Preço"
          input={
            <InputText
              value={currencyFormat(product.price || '')}
              onChange={({ target: { value } }) => {
                const toInteger = parseInt(value.replace(/[R$\.,]/g, ''), 10);
                setProduct(old => ({ ...old, price: maskInput(toInteger, '#######', true) }));
              }}
              placeholder="R$ 100,00"
              inputMode="numeric"
            />
          }
        />
      ),
    [product.status, product.price],
  );
  const referenceIdInput = useMemo(
    () =>
      product.status === 'available' && (
        <FormInput
          name="referenceId"
          label="Referência"
          input={
            <InputText
              value={product.referenceId || ''}
              onChange={({ target: { value } }) => setProduct(old => ({ ...old, referenceId: value }))}
              placeholder="Referência da loja"
            />
          }
        />
      ),
    [product.status, product.referenceId],
  );

  const descriptionInput = useMemo(
    () =>
      product.status === 'available' && (
        <FormInput
          name="description"
          label="Descrição"
          input={
            <InputText
              value={product.description || ''}
              onChange={({ target: { value } }) => setProduct(old => ({ ...old, description: value }))}
              placeholder="Descrição"
            />
          }
        />
      ),
    [product.status, product.description],
  );

  const sizesInput = useMemo(
    () =>
      product.status === 'available' && (
        <FormInput
          name="sizes"
          label="Tamanhos"
          input={
            <InputText
              placeholder="P,M,G"
              value={(sizes && sizes.join(',')) || ''}
              onChange={({ target: { value } }) => setSizes(value ? value.split(',') : '')}
            />
          }
        />
      ),
    [product.status, sizes],
  );

  const colorsInput = useMemo(
    () =>
      product.status === 'available' && (
        <FormInput
          name="colors"
          label="Cores"
          input={
            <InputText
              placeholder="Azul,Amarelo"
              value={(colors && colors.join(',')) || ''}
              onChange={({ target: { value } }) => {
                const newColors = value.split(',');
                setProduct(old => {
                  const newQuantities = Object.entries(old.availableQuantities || {}).reduce((prev, [key, value]) => {
                    if (newColors.some(color => key.endsWith(color))) return { ...prev, [key]: value };
                    return prev;
                  }, {});
                  return { ...old, availableQuantities: newQuantities };
                });
                setColors(value ? newColors : '');
              }}
            />
          }
        />
      ),
    [product.status, colors],
  );

  const quantitiesInput = useMemo(
    () =>
      product.status === 'available' &&
      sizes.length && (
        <FormInput
          name="quantities"
          label="Quantidades"
          input={
            <div style={{ display: 'grid', gridGap: '10px', padding: '10px' }}>
              {sizes.map(size =>
                (colors.length ? colors : ['']).map(color => (
                  <div
                    key={`${size}-${color}`}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 2fr 2fr',
                      alignItems: 'center',
                    }}
                  >
                    <label>{size}</label>
                    <label>{color}</label>
                    <InputText
                      placeholder="1"
                      value={(product.availableQuantities && product.availableQuantities[`${size}-${color}`]) || ''}
                      onChange={({ target: { value } }) =>
                        /^[0-9]*$/gm.test(value) &&
                        setProduct(old => {
                          const newQuantities = Object.assign({}, old.availableQuantities || {});
                          newQuantities[`${size}-${color}`] = value;
                          return { ...old, availableQuantities: newQuantities };
                        })
                      }
                    />
                  </div>
                )),
              )}
            </div>
          }
        />
      ),
    [product.status, sizes, colors, product.availableQuantities],
  );
  const arrayInputs = [availabilityInput,referenceIdInput,priceInput, descriptionInput, sizesInput, colorsInput, quantitiesInput];
  return (
    <div style={{...container, maxWidth: '400px', display: 'grid', gridRowGap: '30px', margin: '30px auto'}}>
      <label style={title}>Upload</label>
      <CardForm
        key={index}
        product={product}
        pictures={pictures}
        setPictures={setPictures}
        products={products}
        setProducts={setProducts}
        filesList={filesList}
        setFiles={setFiles}
        index={index}
        picture={examplePicture}
        removeImage={removeImage}
        arrayOfInputs={arrayInputs} />

    </div>
  );
};
