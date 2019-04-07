import React from 'react';

import classes from './Input.css';

const Input = ({
    invalid,
    changed,
    shouldValidate,
    touched,
    valueType,
    elementType,
    elementConfig,
    value,
    label,
}) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement];

    if (invalid && shouldValidate && touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid {valueType}!</p>;
    }

    switch (elementType) {
        // thats actually first time when I see a parentheses around switch case :D
        // case ('input'):
        case "input":
            inputElement = <input
                className={inputClasses.join(' ')}
                {...elementConfig}
                value={value}
                onChange={changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...elementConfig}
                value={value}
                onChange={changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={value}
                    onChange={changed}>
                    {elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...elementConfig} value={value} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{label}</label>
            {inputElement}
            {validationError}
        </div>
    );

};


export default Input;