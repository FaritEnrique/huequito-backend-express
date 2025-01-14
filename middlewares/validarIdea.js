import ideaSchema from '../schemas/ideasSchema.js';

const validarIdea = (req, res, next) => {
    const { error } = ideaSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            errors: error.details.map(err => ({
                message: err.message,
                path: err.path,
            })),
        });
    }
    next();
};

export default validarIdea;