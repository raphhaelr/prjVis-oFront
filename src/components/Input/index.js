import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
} from 'react';


import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error } from './styles';



const Input = ({ name, icon: Icon, ...rest }) => {
    const { fieldName, defaultValue, error, registerField } = useField(name);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const inputRef = useRef(null);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!inputRef.current?.value);
    }, []);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [registerField, fieldName]);

    return (
        <Container isFocused={isFocused} isFilled={isFilled} isErrored={!!error}>
            {Icon && <Icon size={20} />}
            <input
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />

            {error && (
                <Error title={error}>
                    <FiAlertCircle size={20} color="#C53030" />
                </Error>
            )}
        </Container>
    );
};

export default Input;
