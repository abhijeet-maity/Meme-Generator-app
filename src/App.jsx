import { useState, useEffect} from 'react'
import './App.css'
import trollface from "./assets/troll-face-55.png"

function App() {
  const [memeArr, setMemeArr] = useState([]);
  const [meme, setMeme] = useState({
    topText:"",
    bottomText:"",
    url: "http://i.imgflip.com/1bij.jpg"
  })

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch("https://api.imgflip.com/get_memes")
      const data = await res.json();
      console.log(data.data.memes);
      setMemeArr(data.data.memes)
    }
    fetchImage();

  },[])

  function getMemeImage() {
    const index = Math.floor(Math.random() * memeArr.length);
    console.log(index);
    const image = memeArr[index];
    const imageUrl = image?.url;
    console.log(imageUrl);
    setMeme((prev) => {
      return {
        ...prev,
        url: imageUrl
      }
    })
  }

  function handleChange(event) {
    const {name, value} = event.target
    setMeme(prevMeme => ({
        ...prevMeme,          
        [name]: value
    }))
  }

  

 

  return (
    <div className='app'>
      <header>
        <img src={trollface} alt="face" className=''/>
        <h2>Meme Generator</h2>
        <h3>made with ❤️</h3>
      </header>
      <main>
        <section className='input-section'>
          <input className='input' type="text" name='topText' placeholder='Enter top text' value={meme.topText} onChange={handleChange}/>
          <input className='input' type="text" name='bottomText' placeholder='Enter bottom text' value={meme.bottomText} onChange={handleChange}/>
          <button className='btn' onClick={getMemeImage}>Get new meme image</button>
        </section>
        <section className='meme-result'>
          <div className='meme-image'
              style={{
              backgroundImage: `url(${meme.url})`,
              backgroundSize: 'cover',
            }}></div>
          <h2 className='meme-text top'>{meme.topText}</h2>
          <h2 className='meme-text bottom'>{meme.bottomText}</h2>
        </section>
      </main>
  </div>
  )
}

export default App
