import { Text } from 'react-native'
import { Controller } from 'react-hook-form';
import { Input } from './Input';

const FormInput = ({control, name, secureTextEntry,...otherProps}: any) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error }})=>(
      <>
        <Input
            value={value}
            label={otherProps.label}        
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize={false}
            secureTextEntry={secureTextEntry || false}
            {...otherProps}
        />
        {error &&   <Text className='text-red-600 w-[70%] font-semibold'>
                        {error.message}
                    </Text>
        }
      </>
      )}
    />
  )
}
export default FormInput;