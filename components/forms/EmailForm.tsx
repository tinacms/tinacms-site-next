import React, { useState } from 'react';
import { addToMailchimp } from '../../utils';
import { Input, Button } from '../ui';
import { useRouter } from 'next/router';
import Image from 'next/image';
import BettyWithLlama from '../../public/img/BettyWithLlama.png';
import { ImCross } from "react-icons/im";
import { IoIosWarning } from "react-icons/io";
import { TiTick } from "react-icons/ti";

interface EmailFormProps {
  isFooter: boolean;
}

export const EmailForm = (props: EmailFormProps) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isEntering, setIsEntering] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [message, setMessage] = useState({ text: '', type: '' });

  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setMessage({ text: '', type: '' });
    try {
      const result = await addToMailchimp(email, firstName, lastName);
      if (result.result === 'success') {
        setMessage({ text: "You've been added to the llama list.", type: 'success' });
      } else if (result.message.includes('400')){
        setMessage({ text: "You're already in our herd!", type: 'warning' });
      } else {
        setMessage({ text: 'There was an error. Please try again.', type: 'error' });
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setMessage({ text: 'There was an error. Please try again.', type: 'error' });
    }
    setIsProcessing(false);
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsEntering(true);
      setter(event.currentTarget.value);
    };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-1 bg-white max-w-7xl mx-auto">
      <div className="relative lg:h-full md:h-80 h-32">
        <Image 
          src={BettyWithLlama} 
          alt="Betty with a llama" 
          layout="fill"
          objectFit="cover"
          className="w-full h-full" 
        />
      </div>
      <div className="lg:pt-12 lg:pb-7">
        <form
          id="newsletter-signup"
          onSubmit={handleSubmit}
          className={`flex flex-col justify-center pt-8 pb-9 p-10 md:p-12 lg:p-20 ${props.isFooter ? 'w-auto' : ''}`}
        >
          <h1 className="inline-block lg:text-left md:text-left sm:text-center m-0 md:text-4xl font-tuner lg:text-3xl text-xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Join the Herd! 🦙
          </h1>
          <p className="text-left w-full mt-2 mb-4">
            Become part of our coding community and stay updated with the latest tips and news. Learn more about the community and get llama-zing content delivered to your inbox!
          </p>
                      {message.text && (
              <p className={`font-tuner text-sm mb-4 flex items-center gap-2 ${message.type === 'success' ? 'text-green-500' : message.type === 'warning' ? 'text-orange-500' : 'text-red-500'}`}>
                {message.type === 'success' && <TiTick />}
                {message.type === 'warning' && <IoIosWarning />}
                {message.type === 'error' && <ImCross />}
                <span>{message.text}</span>
              </p>
            )}
                    <div className="flex flex-col gap-1.5 md:flex-row md:gap-2 w-full md:mb-1">
            <Input
              placeholder="First name"
              name="firstName"
              type="text"
              onChange={handleInputChange(setFirstName)}
              onFocus={handleInputChange(setFirstName)}
              disabled={isProcessing}
              className="w-full"
            />
            <Input
              placeholder="Last name"
              name="lastName"
              type="text"
              onChange={handleInputChange(setLastName)}
              onFocus={handleInputChange(setLastName)}
              disabled={isProcessing}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-1.5 mt-2 mb-1 w-full">
            <Input
              placeholder="Email"
              name="email"
              type="email"
              onChange={handleInputChange(setEmail)}
              onFocus={handleInputChange(setEmail)}
              disabled={isProcessing}
              className="w-full"
            />
          </div>
          <div className="w-full flex justify-end">
            <Button
              type="submit"
              color="orange"
              disabled={isProcessing}
              className="mt-4"
            >
              {isProcessing ? 'Processing...' : 'Subscribe'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

EmailForm.defaultProps = {
  isFooter: false,
};

export default EmailForm;
