import React, {useState} from 'react';
import { motion } from 'framer-motion';

export default function App(){
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [minted, setMinted] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFile = (e) => {
    const f = e.target.files[0];
    if(!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  const dummyMint = async () => {
    if(!name || !file) return alert('Lengkapi nama NFT dan upload gambar terlebih dahulu.');
    setLoading(true);
    // simulate upload & tx delay
    await new Promise(res => setTimeout(res, 1400));
    // create fake tx hash and ipfs url
    const fakeHash = '0x' + Math.random().toString(16).slice(2, 14) + Math.random().toString(16).slice(2,14);
    const fakeIpfs = 'ipfs://bafkre' + Math.random().toString(16).slice(2,10);
    setMinted({tx: fakeHash, uri: fakeIpfs, name, image: preview});
    setLoading(false);
  }

  return (
    <div className="container">
      <div className="header">
        <div className="title">NFT Minting dApp — Portfolio Demo</div>
        <div className="small">Raka MH</div>
      </div>

      <div className="card">
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.35}}>
          <div className="form-row">
            <label className="small">Nama NFT</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Contoh: RakaArt #1" />
          </div>

          <div className="form-row">
            <label className="small">Upload Gambar</label>
            <input className="file-input" type="file" accept="image/*" onChange={onFile} />
          </div>

          {preview && (
            <div className="preview">
              <div>
                <div className="small">Preview</div>
                <img src={preview} alt="preview" />
              </div>
            </div>
          )}

          <div style={{marginTop:12}}>
            <button className="button" onClick={dummyMint} disabled={loading}>
              {loading ? 'Processing...' : 'Mint (Demo)'}
            </button>
          </div>

          <div className="meta">This is a demo front-end for portfolio — it does not perform real blockchain transactions.</div>

          {minted && (
            <div className="toast">
              Minted: <strong>{minted.name}</strong><br/>
              TX: <span className="small">{minted.tx}</span><br/>
              URI: <span className="small">{minted.uri}</span><br/>
              <div style={{marginTop:8}}>
                <img src={minted.image} alt="minted" style={{maxWidth:220,borderRadius:8}} />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
