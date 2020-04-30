import app from './config/express';

app.listen(app.get("port"), app.get("host"), () => {
    console.info(`Server started on port ${app.get("port")} (${app.get("host")})`);
});