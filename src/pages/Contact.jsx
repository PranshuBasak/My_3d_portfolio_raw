import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import emailjs from '@emailjs/browser';
import Fox from '../models/Fox'
import Loader from '../components/Loader';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';
import { socialLinks } from '../constants/index';

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({name: '',email: '',message: ''})

  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle')

  const {alert , showAlert , hideAlert} = useAlert();


  const handleChange = (e) => {
    setForm({...form,[e.target.name]: e.target.value})
  }

  const handleFocus = () =>{
    setCurrentAnimation('walk');
;  }
  const handleBlur = () =>{
    setCurrentAnimation('idle');
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation('hit');
    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Pranshu",
        from_email: form.email,
        to_email: 'pranshubasak@gmail.com',
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      
    ).then(() =>{
      setIsLoading(false);
      showAlert({
        show: true,
        text: 'Message sent successfully',
        type: 'success'
      })
      setTimeout(() =>{
        hideAlert();
        setForm({name: '',email: '',message: ''})
        setCurrentAnimation('idle')
      },[3000])
      
    }).catch((error) =>{
      setIsLoading(false);
      showAlert({
        show: true,
        text: 'Message not sent',
        type: 'danger'
      })
      setCurrentAnimation('idle');
      console.log(error);
    })
  }

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show && <Alert {...alert}/>}
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in touch</h1>

        <form action="" className="w-full flex flex-col gap-7 mt-14"
        onSubmit={handleSubmit}>
          <label htmlFor="" className="text-black-500 font-semibold">
            Name
            <input type="text" 
            name="name"
            className="input"
            placeholder='John'
            required
            value={form.name}
            onChange={handleChange} 
            onFocus={handleFocus}
            onBlur={handleBlur}/>
            
          </label>
          <label htmlFor="" className="text-black-500 font-semibold">
            Email
            <input 
            type='email'
            name='email'
            className='input'
            placeholder='John@gmail.com'
            required
            value={form.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}/>
            
          </label>
          <label htmlFor="" className="text-black-500 font-semibold">
            Your Message
            <textarea 
            name="message"
            rows={4}
            className="textarea"
            placeholder='Let me know how i can help you!'
            required
            value={form.message}
            onChange={handleChange} 
            onFocus={handleFocus}
            onBlur={handleBlur}/>
            
          </label>

          <button
          type="submit"
          className='btn'
          disabled={isLoading}
          onFocus={handleFocus}
          onBlur={handleBlur}>
            {isLoading? 'Sending...' : 'Send Message'}
          </button>
        </form>
        <div className="py-10 w-full">
        <ul className='flex sm:gap-10 gap-1 items-center justify-center'>
        {socialLinks.map((link) => (
            <li key={link.name} className='px-3 text-black-500/80 font-sans'>
              <a href={link.link} target="_blank" rel="noopener noreferrer">
                <img src={link.iconUrl} alt={link.name} 
                className='sm:w-10 sm:h-10 h-5 w-5'/>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        </div>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas
        camera={{
          position: [0,0,5],
          fov: 75,
          near: 0.1,
          fa: 1000,
        }}>
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={0.5  } />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />

          <Suspense fallback={<Loader />}>
            <Fox 
            currentAnimation={currentAnimation}
            position={[0.5 , 0.35 , 0]}
            rotation={[12.6,-0.6,0]}
            scale={[0.5 , 0.5 , 0.5]}/>
          </Suspense>

        </Canvas>
      </div>
    </section>
  )
}

export default Contact