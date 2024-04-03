import { useEffect, useState } from 'react';
import useNewSubForm from './hooks/useNewSubForm';
import { Sub } from './types';
import '../index.css';

interface FormProps {
    onNewSub: (newSub: Sub) => void;
}

const Form: React.FC<FormProps> = ({ onNewSub }) => {
    const [inputValues, dispatch] = useNewSubForm();
    const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState<boolean>(false);
    const [randomAvatar, setRandomAvatar] = useState<string>('');

    useEffect(() => {
        if (inputValues.gender === 'masculino') {
            generateRandomAvatar('men');
        } else if (inputValues.gender === 'femenino') {
            generateRandomAvatar('women');
        }
    }, [inputValues.gender]);

    const generateRandomAvatar = (gender: string) => {
        const randomIndex = Math.floor(Math.random() * 100) + 1;
        const randomAvatarUrl = `https://randomuser.me/api/portraits/${gender}/${randomIndex}.jpg`;
        setRandomAvatar(randomAvatarUrl);
    };

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (privacyPolicyAccepted) {
            const newSub = { ...inputValues, avatar: randomAvatar };
            onNewSub(newSub);
            dispatch({ type: "clear" });
        } else {
            alert("Debes aceptar la política de privacidad para añadir una suscripción.");
        }
    };

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = evt.target;
        dispatch({
            type: "change_value",
            payload: {
                inputName: name,
                inputValue: name === "subMonths" ? parseInt(value, 10) : value
            }
        });
    };

    const handlePrivacyPolicyChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setPrivacyPolicyAccepted(evt.target.checked);
    };

    return (
        <div className="form-container">
            <h2>Añadir Suscripción</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <input onChange={handleChange} value={inputValues.nick} type="text" name="nick" placeholder="Nick" className="form-control" />
                </div>
                <div className="form-group">
                    <input onChange={handleChange} value={inputValues.subMonths.toString()} type="number" name="subMonths" placeholder="SubMonths" className="form-control" />
                </div>
                <div className="form-group">
                    <textarea onChange={handleChange} value={inputValues.description} name="description" placeholder="Descripción" className="form-control" />
                </div>
                <div className="form-group">
                    <select onChange={handleChange} value={inputValues.gender} name="gender" className="form-control">
                        <option value="">Selecciona género</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="checkbox-label">
                        <input type="checkbox" checked={privacyPolicyAccepted} onChange={handlePrivacyPolicyChange} className="checkbox-input" />
                        Acepto la política de privacidad
                    </label>
                </div>
                <button type="submit" disabled={!privacyPolicyAccepted} className="btn-submit">Guardar</button>
            </form>
            {randomAvatar && (
                <div>
                    <h3>Imagen de perfil</h3>
                    <img src={randomAvatar} alt="Avatar" />
                </div>
            )}
        </div>
    );
};

export default Form;
