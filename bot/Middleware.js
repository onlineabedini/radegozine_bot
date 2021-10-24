module.exports = async (ctx, next) => {
    console.log(ctx.message)
    next()
}