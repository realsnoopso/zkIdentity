import { useSelector, useDispatch } from 'react-redux'
import { increment } from '../modules/addVoca'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getDocs } from "firebase/firestore"; 
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

function Home() {
  const voca = useSelector((state) => state.voca.value)
  const dispatch = useDispatch()
  const [vocas, setVocas] = useState([])

  useEffect(() => { 
    getDB();
  }, []);

  function getDB () {
    const refDB = collection(db, 'vocas')
    getDocs(refDB).then(response => {
      const vocas = response.docs.map(doc => ({
        data: doc.data(), 
        id: doc.id,
        voca: doc.data().voca,
        description: doc.data().description,
        example: doc.data().example
      }))
      setVocas(vocas);
    }).catch(error => console.log(error.message))
  }

  const sizes = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px',
  };

  const devices = {
    mobileS: `(min-width: ${sizes.mobileS})`,
    mobileM: `(min-width: ${sizes.mobileM})`,
    mobileL: `(min-width: ${sizes.mobileL})`,
    tablet: `(min-width: ${sizes.tablet})`,
    laptop: `(min-width: ${sizes.laptop})`,
    laptopL: `(min-width: ${sizes.laptopL})`,
    desktop: `(min-width: ${sizes.desktop})`,
  };

  const Cards = styled.li`
    display: flex;
    flex-direction: row;
    display: grid;
    column-gap: 20px;
    grid-template-columns: auto;

    @media ${devices.tablet} {
      grid-template-columns: auto auto auto;
    }  
  `;

  const Card = styled.li`
    flex: 1;
    border: 1px solid black;
    list-style: none;
    padding: 20px;
  `;

  const Title = styled.h5`
    font-size: 24px;
  `;

  const Caption = styled.p`
    color: blue;
  `;

  const AddBtn = styled.button`
    background-color: red;
    color: white;
  `;

  return (
    <div className="Home">
      <Cards>
        {vocas.map(voca =>
          <Card key={voca.id}>
            <Title>{voca.voca}</Title>
            <p>{voca.description}</p>
            <Caption>{voca.example}</Caption>
          </Card>
        )}
      </Cards>
      <Link to="/add">
          <AddBtn>
            +
          </AddBtn>
      </Link>
    </div>
  );
}

export default Home;
