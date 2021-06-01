/*
 *   Copyright (c) 2021 Kerim Kaan Dönmez
 *   All rights reserved.
 */

/* --------------------------------

    AMB-TASK

   --------------------------------
*/
import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import InfoIcon from '@material-ui/icons/Info';
import Input from '@material-ui/core/Input';
import Days from './Days'

// Material-UI tarafında css özelliklerinin manipule edilmesi
const useStyles = theme => ({
    button: {
        marginLeft: 'auto'
    },
    root: {
        minWidth: 275,
        padding: theme.spacing(2),
        backgroundColor: "#eeeeee"
    },
    input: {
        width: 25,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    card: {
        minWidth: 275,
        padding: theme.spacing(0.1)
    },
    sunday: {
        minWidth: 275,
        padding: theme.spacing(0.1),
        backgroundColor: '#f1c0b1'
    },
    saturday: {
        minWidth: 275,
        padding: theme.spacing(0.1),
        backgroundColor: '#f1c9b1'
    },
    title: {
        fontSize: 12,
    },
    pos: {
        marginBottom: 12,
        marginTop: 12,
        fontSize: 11
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    }

});

class App3 extends Component {
    constructor(props) {
        super(props);

        this.state = { // Immutable state
            defaultData : {
                startHour: 8,
                startMinute: 30
            },
            defaultChangeData : { // Değişiklerin karşılaştırılacağı state
                startHour: 8,
                startMinute: 30
            }
,

            shift:
            // For monday
            {
                isHoliday: false,
                startHour: 8,
                startMinute: 30,
                finishHour: 18,
                finishMinute: 0
            }
            // Populate this array for other days
            ,
            default: {
                startHour: 8,
                startMinute: 30
            }
        }
    } 

    // Varsayılan çalışma saatleri kısmındaki "Kaydet" butonuna tıklandığında changeData state'ini değiştiren fonksiyon
    saveTime = () => {
            this.setState({
                ...this.state,
                defaultChangeData: {
                    startHour: this.state.defaultData.startHour,
                    startMinute: this.state.defaultData.startMinute
                }
            });
        };

    // Varsayılan çalışma saati değişiklerinin takip edildiği fonksiyon
    onChangeStartHourTime = (e) => {
        const startM = this.state.defaultData.startMinute;
        const date = new Date();
        date.setHours(Number(e.target.value.slice(0, 2)));
        this.setState({
            ...this.state,
            defaultData: {
                startHour: date.getHours(),
                startMinute: startM }
        });
    }

    // Varsayılan çalışma dakikası değişiklerinin takip edildiği fonksiyon
    onChangeStartMinuteTime = (e) => {
        const date = new Date();
        const startH = this.state.defaultData.startHour;
        date.setMinutes(Number(e.target.value.slice(0,2)));
        this.setState({
            defaultData: {
                startMinute: date.getMinutes(),
                startHour: startH}
            });
    }

    // Varsayılan çalışma saati butonunun görülüp görülmeyeceğini boolean olarak döndürür.
    disableButton = () => {
        if (this.state.defaultData.startHour === this.state.defaultChangeData.startHour && this.state.defaultData.startMinute === this.state.defaultChangeData.startMinute) {
            return true
        }
        else {
            return false
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item x s={12}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" href="/">
                                Ayarlar
                            </Link>
                            <Typography color="textPrimary">Çalışma Saatleri</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <Alert icon={<InfoIcon style={{ color: "blue" }} fontSize="inherit" />} style={{
                                backgroundColor: 'white'
                            }}> Yetkili servis çalışma saatlerini buradan ayarlayabilirsiniz.</Alert>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Varsayılan Çalışma Saatleri
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    Bu ayar tatil olan günlerde, gece nöbetinin ayarlanabilmesi için önemlidir.
                                </Typography>
                                <Typography variant="body2" component="p">
                                    <form className={classes.container} noValidate>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Başlangıç: </td>
                                                    <td>
                                                        <Input
                                                            className={classes.input}
                                                            onChange={this.onChangeStartHourTime}
                                                            defaultValue= {this.state.defaultData.startHour}
                                                        />
                                                    </td>
                                                    <td>
                                                        :
                                                    </td>
                                                    <td>
                                                        <Input
                                                            className={classes.input}
                                                            defaultValue= {this.state.defaultData.startMinute}
                                                            onChange={this.onChangeStartMinuteTime}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Button
                                                            className={classes.button}
                                                            disabled={this.disableButton() }
                                                            onClick= {this.saveTime}
                                                        > Kaydet
                                                    </Button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </form>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Days classes={classes} day="Pazartesi" defaultTime={this.state.shift} />
                    <Days classes={classes} day="Salı" defaultTime={this.state.shift} />
                    <Days classes={classes} day="Çarşamba" defaultTime={this.state.shift} />
                    <Days classes={classes} day="Perşembe" defaultTime={this.state.shift} />
                    <Days classes={classes} day="Cuma" defaultTime={this.state.shift} />
                    <Days classes={classes} day="Cumartesi" defaultTime={this.state.shift} />
                    <Days classes={classes} day="Pazar" defaultTime={this.state.shift} />

                </Grid>
            </div >
        )
    }
}
export default withStyles(useStyles)(App3)
