// middlewares/authorizeRole.js
const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token inválido' });
            }

            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({ message: 'Acceso denegado' });
            }

            req.user = user;
            next();
        });
    };
};

module.exports = authorizeRole;
