import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Box, Button, FormGroup, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { serverReq } from '../../redux/action/axiosAction';
import { TableDataUser } from '../TableDataUser/TableDataUser';
import InputMask from 'react-input-mask';

export const MainPage: FC = () => {
    // для фокусировки на первом и обязательном инпуте в момент первого рендера
    useEffect(() => {
        const focusInput = document.getElementById('email-required');
        if (focusInput) {
            focusInput.focus();
        }
    }, []);
    const userData = useSelector((store: any) => store.data);

    const dispatch = useDispatch();
    // console.log(userData, 'reduxDataApi');

    // состояние для инпутов
    const [formData, setFormData] = useState({
        email: '',
        number: '',
    });

    const [emailError, setEmailError] = useState(''); //состояние для ошибки при некорректном email
    const [numberError, setNumberError] = useState(''); //состояние для ошибки при некорректном number
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); //состояние для отключения кнопки

    // Простая проверка на валидность email с использованием регулярного выражения
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Проверяем, что введенное значение является числом
    const validateNumber = (number: string) => {
        // Удаляем дефисы из номера перед проверкой
        const numberWithoutDashes = number.replace(/-/g, '');

        // Проверяем номер только в том случае, если он предоставлен
        if (numberWithoutDashes.trim() === '') {
            return true; // Номер необязателен и считается допустимым, если он пустой
        }

        return !isNaN(Number(numberWithoutDashes));
    };

    //хэндлер для контролируемых инпутов
    const ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Валидация email
        if (name === 'email') {
            if (!validateEmail(value)) {
                setEmailError('Некорректная почта');
            } else {
                setEmailError('');
            }
        }

        // Валидация number
        if (name === 'number') {
            if (!validateNumber(value)) {
                setNumberError('Номер должен быть числом');
            } else {
                setNumberError('');
            }
        }

        // Проверка, можно ли активировать кнопку "submit"
        setIsSubmitDisabled(
            !!emailError || (!!numberError && !formData.number.includes('-'))
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Если есть ошибка с адресом электронной почты, не отправляем форму
        if (!!emailError) {
            return;
        }

        // Дополнительная проверка для номера (если он предоставлен)
        if (formData.number && !validateNumber(formData.number)) {
            setNumberError('Номер должен быть числом');
            return;
        } else {
            setNumberError('');
        }

        dispatch(serverReq(e));
    };

    return (
        <>
            <Box
                component='div'
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '30ch' },
                }}
                display='flex'
                alignItems='center'
                justifyContent='center'
                minHeight='80vh'
            >
                <form onSubmit={handleSubmit}>
                    <FormGroup
                        sx={{
                            flexGrow: 1,
                            borderRadius: '11px',
                            marginTop: '12px',
                            backgroundColor: 'white',
                            padding: '14px',
                        }}
                    >
                        <TextField
                            name='email'
                            required
                            id='email-required'
                            label='Email'
                            type='text'
                            onChange={ChangeHandler}
                            value={formData.email}
                            error={!!emailError}
                            helperText={emailError}
                        />
                        <TextField
                            name='number'
                            id='outlined-password-input'
                            label='Номер'
                            type='text'
                            onChange={ChangeHandler}
                            value={formData.number}
                            error={!!numberError}
                            helperText={numberError}
                            InputProps={{
                                inputComponent: InputMask as any,
                                inputProps: {
                                    mask: '99-99-99',
                                    maskChar: null,
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            disabled={isSubmitDisabled}
                        >
                            Отправить
                        </Button>
                        <div
                            className='g-signin2'
                            data-onsuccess='onSignIn'
                        />
                    </FormGroup>
                </form>
            </Box>
            {userData && userData?.message ? (
                <p
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        color: 'red',
                    }}
                >
                    {userData.message}
                </p>
            ) : Array.isArray(userData) ? (
                <TableDataUser userData={userData} />
            ) : (
                <p style={{ display: 'flex', justifyContent: 'center' }}>
                    Данные еще не загружены...
                </p>
            )}
        </>
    );
};

export default MainPage;
