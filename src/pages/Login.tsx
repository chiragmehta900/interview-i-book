import React, {useState} from "react";
import {
    Box,
    BoxProps, CircularProgress,
    Divider,
    IconButton,
    InputAdornment,
    styled,
    useMediaQuery,
    useTheme
} from "@mui/material";
import KitShow from "../kit/components/KitShow";
import Typography from "@mui/material/Typography";
import KitButton from "../kit/components/KitButton";
import KitPhoneField from "../kit/components/KitPhoneField";
import KitInputFiled from "../kit/components/KitInputFiled";
import KitIcon from "../kit/components/KitIcon";
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import axios from "axios";
import {Countries} from "../kit/type/Countries";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom';

const LeftWrapper = styled(Box)<BoxProps>(({theme}) => ({
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
}));

const RightWrapper = styled(Box)<BoxProps>(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}));

const Logo = styled('img')(() => ({
    height: '50px',
    width: '50px',
    display: 'flex',
    margin: '0 auto'
}));

const InfoTitle = styled('img')(() => ({
    height: '350px',
    width: 'auto',
}));

const Form = styled('form')(({theme}) => ({
    padding: theme.spacing(5, 0)
}));

const DividerWrapper = styled(Divider)(({theme}) => ({
    color: '#767B84',
    '& .MuiDivider-wrapper': {fontStyle: 'italic', pl: 0, pr: 4},
    fontSize: theme.typography.body2.fontSize,
    margin: `${theme.spacing(4, 0)} !important`,
}));

interface FormData {
    countryPhoneCode: string
    phoneNumber: string
    password: string
}

const schema = yup
    .object({
        countryPhoneCode: yup.string().required('Country code is a required field'),
        phoneNumber: yup.string().required('Phone number is a required field'),
        password: yup.string().required('Password is a required field'),
    })
    .required();

const Login = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const hidden = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [countriesList, setCountriesList] = useState<Countries[]>([]);
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    const defaultValues: FormData = {
        countryPhoneCode: "972",
        phoneNumber: "",
        password: "",
    }

    const {
        setValue,
        control,
        handleSubmit,
        formState: {errors, isDirty, isValid},
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    const isBtnDisabled = !isValid || !isDirty || isLoginLoading;

    const renderLeftSide = () => {
        return (
            <KitShow show={!hidden}>
                <LeftWrapper sx={{backgroundImage: `url('/images/login/bg-layer.png')`}}>
                    <Box sx={{display: 'grid'}}>
                        <Logo src={'/images/logo.svg'} alt={'logo'}/>
                        <InfoTitle src={'/images/login/info.png'} alt={'logo'}/>
                        <Box sx={{textAlign: 'center', maxWidth: '500px', margin: 'auto'}}>
                            <Typography variant={'h4'} sx={{fontWeight: '500'}}>
                                Manage Bookings Effortlessly
                            </Typography>
                            <Typography variant={'subtitle2'} color={'#61676F'}>
                                Maximize productivity through seamless booking management, optimizing your workflow
                                effortlessly.
                            </Typography>
                        </Box>
                    </Box>
                </LeftWrapper>
            </KitShow>
        )
    }

    const renderRightSide = () => {
        return (
            <RightWrapper>
                <Box sx={{display: 'grid'}}>
                    <Box sx={{textAlign: 'center', maxWidth: '500px', margin: 'auto'}}>
                        <Typography variant={'h4'} sx={{fontWeight: 'bold'}}>
                            Welcome to <span style={{color: '#006ABB'}}>IBOOK</span>
                        </Typography>
                        <Typography variant={'subtitle2'} color={'#61676F'}>
                            Login to your account
                        </Typography>
                    </Box>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name='phoneNumber'
                            control={control}
                            render={({field: {value, onChange}}) => (
                                <KitPhoneField
                                    title='Phone number'
                                    countriesList={countriesList}
                                    countryCode={(e: string) => setValue('countryPhoneCode', e)}
                                >
                                    <KitInputFiled
                                        fullWidth
                                        size='small'
                                        type={'number'}
                                        value={value}
                                        sx={{mb: 4}}
                                        autoComplete='off'
                                        onChange={onChange}
                                        error={Boolean(errors.phoneNumber)}
                                        placeholder='Enter your phone number'
                                        aria-describedby='validation-basic-first-name'
                                        helperText={errors.phoneNumber?.message}
                                    />
                                </KitPhoneField>
                            )}
                        />
                        <Controller
                            name='password'
                            control={control}
                            render={({field: {value, onChange, onBlur}}) => (
                                <KitInputFiled
                                    fullWidth
                                    sx={{mb: 4}}
                                    value={value}
                                    onBlur={onBlur}
                                    label='Password'
                                    onChange={onChange}
                                    placeholder='Enter your password'
                                    error={Boolean(errors.password)}
                                    {...(errors.password && {
                                        helperText: errors.password.message,
                                    })}
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    edge='end'
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    <KitIcon
                                                        fontSize='1.25rem'
                                                        icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'}
                                                    />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                        <KitButton fullWidth variant={'contained'} type={'submit'} disabled={isBtnDisabled}>
                            <KitShow show={isLoginLoading}>
                                <CircularProgress sx={{mr: 2}} color='inherit' size={18}/>
                            </KitShow>
                            Sign In
                        </KitButton>
                        <DividerWrapper>
                            Don’t have an account?
                        </DividerWrapper>
                        <KitButton fullWidth variant={'contained'}
                                   sx={{backgroundColor: '#EEEEEE', boxShadow: 'none', color: '#000000'}}>Create an
                            account</KitButton>
                    </Form>
                </Box>
            </RightWrapper>
        )
    }

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoginLoading(true);

            const body = {
                ...data,
                deviceToken: 'string',
            };

            const URL = 'https://bookwedding.azurewebsites.net/api/client/auth/login';
            const response = await axios.post(URL, body);

            if (response.status === 200) {
                localStorage.setItem("I-BOOK", response.data);
                toast.success('Login successfully.');
                navigate('/home')
            }
        } catch (error: any) {
            setIsLoginLoading(false);
            toast.error(error?.response?.data?.Error || 'An error occurred.');
        }
    };


    const fetchCountriesList = React.useCallback(async () => {
        try {
            const URL = 'https://bookwedding.azurewebsites.net/api/countries';
            const response = await axios.get(URL);

            if (response.status === 200) {
                setCountriesList(response.data);
            }
        } catch (error) {
            toast.error('Error while fetching countries');
        }
    }, []);


    React.useEffect(() => {
        fetchCountriesList();
    }, [fetchCountriesList]);

    return (
        <>
            <Box sx={{display: 'flex', height: '100vh'}}>
                {renderLeftSide()}
                {renderRightSide()}
            </Box>
        </>
    )
}

export default Login;