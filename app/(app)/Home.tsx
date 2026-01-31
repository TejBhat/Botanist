import {Text,StyleSheet, ImageBackground, Pressable, Animated } from "react-native";
import {Button} from "react-native-paper";
import Octicons from '@expo/vector-icons/Octicons';
import { useRef, useState } from "react";
import { router } from "expo-router";

export default function HomeScreen(){
          
    const [menuOpen, setMenuOpen]=useState(false);
    const slide=useRef(new Animated.Value(-250)).current;
    const toggleMenu=()=>{
        Animated.timing(slide,{
            toValue:menuOpen?-250:0,
            duration:250,
            useNativeDriver:true,
        }).start();
        setMenuOpen(!menuOpen);
    };

    return(
            <ImageBackground
            source={require("../../assets/images/greenbackground.jpg")}
            style={style.wholescreen}
            resizeMode="cover">
                <Pressable style={style.menubutton} onPress={toggleMenu}>
                <Octicons name="three-bars" size={28} color={menuOpen?"#006400":"#ffff00"} />
                </Pressable>
                {menuOpen && <Pressable style={style.overlay} onPress={toggleMenu}/>}
                <Animated.View style={[style.sideMenu,{transform:[{translateX:slide}]}]}>
                    <Pressable style={style.menuItem} onPress={()=>{toggleMenu;router.push("/(app)/about")}}>
                        <Text style={style.menuText}>About Botanist</Text>
                    </Pressable>
                    <Pressable>
                        <Text>......</Text>
                    </Pressable>
                </Animated.View>
                 <Text style={style.title}>Botanist</Text>
                <Button mode="contained" style={style.button} 
                contentStyle={style.buttontext} 
                labelStyle={style.buttonLabel}>Take a photo</Button> {/*click the button, it goes to camera to take the photo*/}
            </ImageBackground>
    );
}

const style=StyleSheet.create({
    title:{
        position:"absolute",
        top:100,
        fontWeight:"bold",
        fontSize:40,
        color:"#ffff00",
    },
    wholescreen:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    menubutton:{
        position:"absolute",
        top:55,
        left:25,
        zIndex:20,
    },
    menuItem:{
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0, 100, 0, 0.1)",
    },
    menuText:{
        fontSize: 20,
        fontWeight: "bold",
        color: "#006400",
    },
    sideMenu:{
        position: "absolute",
        top: 0,
        left: 0,
        width: 200,
        height: "100%",
        backgroundColor:"#ffff00",
        paddingTop: 120,
        paddingHorizontal: 24,
        zIndex: 15,
        elevation: 12,
        shadowColor:"#000",
        shadowOffset:{width:2,height:0},
        shadowOpacity:0.3,
        shadowRadius:10,
    },
    overlay:{
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 5,
    },
button:{
  borderRadius:30,
  width:250,  
  backgroundColor:"#ffff00",
},
buttontext:{
    height:60,
    justifyContent:"center",
},
buttonLabel:{
      fontWeight:"bold",
      fontSize:20,
      color:"#006400",
},

});