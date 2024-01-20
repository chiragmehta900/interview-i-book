import React, {ReactNode, forwardRef} from 'react';
import {
    InputLabel,
    TextField,
    TextFieldProps,
    Box,
    styled, Autocomplete, useTheme,
} from '@mui/material';
import {Countries} from "../../type/Countries";

/** Styled Components */
const PhoneFieldStyled = styled(TextField)<TextFieldProps>(({theme}) => ({
    alignItems: 'flex-start',
    marginRight: '5px',

    '& .MuiInputBase-root': {
        borderRadius: '4px',
        backgroundColor: '#F5F5F5 !important',
        transition: theme.transitions.create(['border-color', 'box-shadow'], {
            duration: theme.transitions.duration.shorter,
        }),
        '&:before, &:after': {
            display: 'none',
        },
        '&.MuiInputBase-sizeSmall': {
            borderRadius: '4px',
        },
        '&.Mui-error': {
            borderColor: theme.palette.error.main,
        },
        '&.Mui-focused': {
            '& .MuiInputBase-input:not(.MuiInputBase-readOnly):not([readonly])::placeholder':
                {
                    transform: 'translateX(4px)',
                },
            '&.MuiInputBase-colorPrimary': {
                borderColor: theme.palette.primary.main,
            },
            '&.MuiInputBase-colorSecondary': {
                borderColor: theme.palette.secondary.main,
            },
            '&.MuiInputBase-colorInfo': {
                borderColor: theme.palette.info.main,
            },
            '&.MuiInputBase-colorSuccess': {
                borderColor: theme.palette.success.main,
            },
            '&.MuiInputBase-colorWarning': {
                borderColor: theme.palette.warning.main,
            },
            '&.MuiInputBase-colorError': {
                borderColor: theme.palette.error.main,
            },
            '&.Mui-error': {
                borderColor: theme.palette.error.main,
            },
        },
        '&.Mui-disabled': {
            backgroundColor: `${theme.palette.action.selected} !important`,
        },
        '& .MuiInputAdornment-root': {
            marginTop: '0 !important',
        },
    },


    /** For Autocomplete */
    '& .MuiAutocomplete-input': {
        paddingLeft: '6px !important',
        paddingTop: '7.5px !important',
        paddingBottom: '7.5px !important',
        '&.MuiInputBase-inputSizeSmall': {
            paddingLeft: '30px !important',
            paddingTop: '2.5px !important',
            paddingBottom: '2.5px !important',
        },
    },

    '& .MuiAutocomplete-inputRoot': {
        paddingTop: '8px !important',
        paddingLeft: '8px !important',
        paddingBottom: '8px !important',
        '&:not(.MuiInputBase-sizeSmall).MuiInputBase-adornedStart': {
            paddingLeft: '13px !important',
        },
        '&.MuiInputBase-sizeSmall': {
            paddingTop: '5px !important',
            paddingLeft: '5px !important',
            paddingBottom: '5px !important',
            '& .MuiAutocomplete-tag': {
                margin: 2,
                height: 22,
            },
        },
    },
}));

const CountryFlag = styled('img')(() => ({
    height: 'auto',
    width: '25px',
}));

interface Props {
    children: ReactNode;
    title: string;
    countriesList: Countries[]
    countryCode: (e: string) => void;
}

const KitPhoneField = forwardRef(({children, title, countryCode, countriesList}: Props) => {
    const theme = useTheme();

    function renderCountryFlag(isoCode: string) {
        const country = countriesList.find((fin: Countries) => fin.countryPhoneCode === isoCode);

        if (!country) {
            return null;
        }

        countryCode(`${country.countryPhoneCode}`);

        return (
            <CountryFlag
                alt=''
                loading='lazy'
                src={country.flagIconUrl}
                srcSet={country.flagIconUrl}
            />
        );
    }

    return (
        <>
            <InputLabel sx={{
                mb: 1,
                fontSize: 13,
                lineHeight: 1.154,
                color: theme.palette.text.primary,
            }}>{title}</InputLabel>
            <Box sx={{display: 'flex'}}>
                <Autocomplete
                    size='small'
                    id='autocomplete-country-select'
                    defaultValue={countriesList.find((fin: Countries) => fin.countryCode === 'IL')}
                    options={countriesList as Countries[]}
                    getOptionLabel={(option) => option.countryPhoneCode}
                    renderOption={(props, option) => (
                        <Box
                            component='li'
                            sx={{'& > img': {mr: 4, flexShrink: 0}}}
                            {...props}
                        >
                            {renderCountryFlag(option.countryPhoneCode as string)}
                            {option.countryPhoneCode}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <Box sx={{position: 'relative'}}>
                            <PhoneFieldStyled
                                sx={{width: '120px', borderRadius: '4px',}}
                                {...params}
                                variant='filled'
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                }}
                            />
                            {params.inputProps.value && (
                                <span
                                    style={{
                                        position: 'absolute',
                                        left: '6px',
                                        top: '9px',
                                    }}
                                >
                                  {renderCountryFlag(params.inputProps.value as string)}
                                </span>
                            )}
                        </Box>
                    )}
                />
                {children}
            </Box>
        </>
    );
});

export default KitPhoneField;
