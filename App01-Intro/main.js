const { app, BrowserWindow } = require('electron')
const path = require("path")

function crearVentanaPrincipal(){
    let ventanaPrincipal = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })

    ventanaPrincipal.loadFile('index.html')
}

app.whenReady().then(crearVentanaPrincipal)

// Esta función se ejecuta cuando todas las ventanas de la aplicación están cerradas.
app.on('window-all-closed', function(){
    // Si el sistema operativo es macOS (darwin), entonces cerramos la aplicación.
    // En macOS, es común mantener la aplicación activa incluso cuando todas las ventanas están cerradas,
    // por eso se comprueba si el sistema operativo es 'darwin' antes de llamar a app.quit().
    if(process.platform === 'darwin'){
        app.quit()
    }
})

// Esta función se ejecuta cuando la aplicación se activa, por ejemplo, cuando el usuario hace clic en el icono
// de la aplicación en el Dock en macOS.
app.on('activate', function(){
    // Si no hay ventanas abiertas en la aplicación, creamos una nueva ventana principal.
    // Esto es importante en macOS, donde es común que la aplicación permanezca abierta sin ventanas visibles,
    // y el usuario puede esperar que una ventana se abra cuando se reactiva la aplicación.
    if(BrowserWindow.getAllWindows().length === 0){
        crearVentanaPrincipal()
    }
})
