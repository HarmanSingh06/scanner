import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity ,View,Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default class ScanScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermission: false,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }
    getCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        var stats = status === 'granted';
        this.setState({
            hasCameraPermission:stats,
            buttonState:'clicked'
        })
    }
    handleBarcodeScanned = async (type, data) => {
        this.setState({ scanned:false,scannedData: type.data, buttonState: 'normal' });
        console.log(type.data)
    }
    render() {
        const hasCameraPermission = this.state.hasCameraPermission;
        const scanned = this.state.scanned;
        const scannedData = this.state.scannedData;
        const buttonState = this.state.buttonState;

        if (buttonState !== 'normal' && hasCameraPermission) {
            return (
                <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarcodeScanned} style={StyleSheet.absoluteFillObject} />
            )
        }
        else if (buttonState === 'normal') {
            return(
            <View>
                <Image source = {require("../scannerImage.jpg")} style = {{marginTop:50,marginRight:50,marginLeft:50}}/>
            <TouchableOpacity style = {styles.scanButton} onPress={() => {
                this.getCameraPermission()
            }}>
                <Text>
                    Scan
                </Text>
            </TouchableOpacity>
            <Text>This is What we found in QR code: {scannedData}</Text>
            </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    scanButton:{
        marginLeft:60,
        marginRight:60,
        marginTop:50,
        marginBottom:50,
        padding:10,
        alignItems:'center',
        borderWidth:5,
        borderRadius:50
    }
})