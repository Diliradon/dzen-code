import { forwardRef } from 'react';

import { Eye, EyeOff, Lock } from 'lucide-react';

import { Input } from './input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InputPassword = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, isVisible, setIsVisible, ...rest }, ref) => {
    const toggleVisibility = () => setIsVisible(prevState => !prevState);

    return (
      <div className="relative">
        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          ref={ref}
          id="input-51"
          className="pe-9"
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          aria-describedby="password-strength"
          {...rest}
        />
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
          aria-controls="password"
        >
          {isVisible ? (
            <EyeOff
              size={20}
              strokeWidth={2}
              aria-hidden="false"
              className="text-gray-400"
            />
          ) : (
            <Eye
              size={20}
              strokeWidth={2}
              aria-hidden="true"
              className="text-gray-400"
            />
          )}
        </button>
      </div>
    );
  },
);

InputPassword.displayName = 'InputPassword';
