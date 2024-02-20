// prevents writing catch(error){}- Block of the Controllers everytime

export function catchAsync(
    controllerFn,
    { message = "Internal server error" }
) {
    return (req, res) =>
        controllerFn(req, res).catch((error) => {
            console.log(error);
            res.status(500).json({
                success: false,
                error,
                message: error.message || message,
            });
        });
}
