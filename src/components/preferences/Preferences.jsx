import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import {PreferencesContext} from "../../context/PreferencesContext";
import "./Preferences.css"
import Button from "../button/Button.jsx";

function Preferences() {
    const [preferencesList, setPreferencesList] = useContext(PreferencesContext)
    const {register, handleSubmit, watch} = useForm({
        defaultValues: {
            temperature: preferencesList.preferredWeather.temperature,
            cloudiness: preferencesList.preferredWeather.cloudiness,
            windspeed: preferencesList.preferredWeather.windspeed,
        }
    })
    // Deze functie observeert veranderingen in de waardes van de geregistreerde formulier
    // elementen en retourneert de actuele waarde.
    const watchCloudiness = watch("cloudiness")
    const watchWindspeed = watch("windspeed")

    const onSubmit = data => {
        console.log("voorkeur", data);
        if (data) {
            let uniqueId =
                new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
            let newPreferences = {
                id: uniqueId,
                preferredWeather: data,
            };
            setPreferencesList(newPreferences);
            localStorage.setItem('preferences', JSON.stringify(newPreferences));

        }
    };
    // useEffect(() => {
    //     localStorage.setItem('preferences', JSON.stringify(preferencesList))
    // }, [preferencesList])
    return (
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>
                <article>
                    <p>Temperatuurvoorkeur</p>
                    <p>koud<input type="range" placeholder="temperature" {...register("temperature", {})}/> Heel Warm
                    </p>
                </article>
                <article>
                    <p>Bewolking:{watchCloudiness}%</p>
                    <input type="range" placeholder="cloudiness"{...register("cloudiness", {})}/>
                </article>
                <article>
                    <p>wind op schaal: {watchWindspeed}</p>
                    <input type="range" placeholder="windspeed" max="12" {...register("windspeed", {})}/>
                </article>
                <Button
                    className='preferences-button'
                    type="submit"
                    text='Opslaan'
                />
            </form>
        </main>
    )
}

export default Preferences