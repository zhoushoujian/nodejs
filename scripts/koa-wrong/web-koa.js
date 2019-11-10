const Koa = require('koa');
const app = new Koa();
app.use((ctx, next) => {
	next();
	ctx.body = "middle1";
});
app.use((ctx, next) => {
	next();
	ctx.body = "middle2";
});

app.use((ctx, next) => {
	next();
	ctx.body = "middle3";
});

app.use((ctx, next) => {
	ctx.body = "middle4";
});



app.listen(3000);
