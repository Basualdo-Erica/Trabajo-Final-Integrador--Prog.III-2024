const bcrypt = require('bcryptjs');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

class AuthController {
    //clave para firmar el token
    static SECRET_KEY =  process.env.SECRET_KEY; 

    async login(req, res) {
        const { correoElectronico, password } = req.body;

        try {
            const [user] = await db.query('SELECT * FROM usuario WHERE correoElectronico = ?', [correoElectronico]);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const passwordIsValid = await bcrypt.compare(password, user.contrasenia);
            if (!passwordIsValid) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            //genera el token JWT
            const token = jwt.sign(
                { id: user.id, correoElectronico: user.correoElectronico }, 
                AuthController.SECRET_KEY, 
                { expiresIn: '1h' } 
            );

            return res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error del servidor' });
        }
    }
}

module.exports = AuthController;
