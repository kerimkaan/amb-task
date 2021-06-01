/*
 *   Copyright (c) 2021 Kerim Kaan Dönmez
 *   All rights reserved.
 */

/*
    Tekil günleri oluşturan kartlar için komponentleri içerir.

    "classes", "day" ve "defaultTime" parametreleri gerekmektedir.
    
    "classes" => CSS sınıfı çağırmak için gerekli (useStyles'dan)
    "day"     => Statik olarak hangi günün kartının oluşturulacağını belirtir
    "defaulTime" => Başlangıç değeri için gerekli değerleri belirtir
*/

import React from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Switch from '@material-ui/core/Switch';

function Days({ classes, day, defaultTime }) {

    // state
    const [data, setState] = React.useState({
        isHoliday: false,
        startHour: 8,
        startMinute: 30,
        finishHour: 18,
        finishMinute: 0
    });

    // Kaydet tuşuna basıldıktan sonra karşılaştırmayı sağlayacak state
    const [changeData, setChangeState] = React.useState({ 
        isHoliday: false,
        startHour: 8,
        startMinute: 30,
        finishHour: 18,
        finishMinute: 0
    });

    // Kaydet butonuna tıklandığında changeData state'ini değiştiren fonksiyon
    const saveTime = () => {
        setChangeState({
            startHour: data.startHour,
            startMinute: data.startMinute,
            finishHour: data.finishHour,
            finishMinute: data.finishMinute
        });
    }  

    // isHoliday tetikleyicisi
    const handleChange = (event) => {
        setState({
            ...data,
            [event.target.name]: (event.target.checked)
        });
    };

    // Başlangıç saati değişikliklerini takip eden fonksiyon
    const onChangeStartHourTime = (e) => {
        const date = new Date();
        date.setHours(Number(e.target.value.slice(0, 2)));
        setState({
            ...data,
            startHour: date.getHours(),
        });
    }

    // Başlangıç dakikası değişikliklerini takip eden fonksiyon
    const onChangeStartMinuteTime = (e) => {
        const date = new Date();
        date.setMinutes(Number(e.target.value.slice(0,2)));
        setState({
            ...data,
            startMinute: date.getMinutes(),
        });
    }

    // Bitiş saati değişikliklerini takip eden fonksiyon
    const onChangeFinishHourTime = (e) => {
        const date = new Date();
        date.setHours(Number(e.target.value.slice(0, 2)));
        setState({
            ...data,
            finishHour: date.getHours(),
        });
    }

    // Bitiş dakikası değişikliklerini takip eden fonksiyon
    const onChangeFinishMinuteTime = (e) => {
        const date = new Date();
        date.setMinutes(Number(e.target.value.slice(0,2)));
        setState({
            ...data,
            finishMinute: date.getMinutes(),
        });
    }

    // Kaydet butonunun görünüp görünmeyeceğini belirleyen fonksiyon => Butondaki "disabled" property'sine boolean veri döndürür
    const disableButton = () => {
        if (data.isHoliday) {
            return true
        }
        else if (data.startHour === changeData.startHour && data.startMinute === changeData.startMinute && data.finishHour === changeData.finishHour && data.finishMinute === changeData.finishMinute) {
            return true
        }
        else {
            return false
        }
    }
    // Cumartesi ve Pazar günleri için ilgili css sınıfını döndürür
    const whichDay = (day) => {
        if (day === "Pazar") {
            return classes.sunday
        }
        else if (day === "Cumartesi") {
            return classes.saturday
        }
        else {
            return classes.card
        }
    }

    return (
        <Grid item xs={3}>
            <Card className={whichDay(day)}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Gün
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {day}
                    </Typography>
                    <Switch
                        checked={data.isHoliday}
                        onChange={handleChange}
                        color="primary"
                        name="isHoliday"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    Tatil
                    <form className={classes.container} noValidate>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Başlangıç :</td>
                                    <td >
                                        <Input
                                            id="sh"
                                            type="text"
                                            className={classes.input}
                                            onChange={onChangeStartHourTime}
                                            defaultValue={defaultTime.startHour}
                                        />
                                    </ td>
                                    <td> : </td>
                                    <td>
                                        <Input
                                            id="sm"
                                            type="text"
                                            className={classes.input}
                                            onChange={onChangeStartMinuteTime}
                                            defaultValue={defaultTime.startMinute}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Bitiş :</td>
                                    <td >
                                        <Input
                                            id="fh"
                                            type="text"
                                            className={classes.input}
                                            onChange={onChangeFinishHourTime}
                                            defaultValue={defaultTime.finishHour}
                                        />
                                    </ td>
                                    <td> : </td>
                                    <td>
                                        <Input
                                            id="fm"
                                            type="text"
                                            className={classes.input}
                                            onChange={onChangeFinishMinuteTime}
                                            defaultValue={defaultTime.finishMinute}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </CardContent>

                <CardActions >

                    <Button
                        className={classes.button}
                        disabled={
                            disableButton()
                        }
                        onClick={saveTime}
                    >
                        kaydet
                    </Button>

                </CardActions>

            </Card>
        </Grid >
    )
}
export default Days;