const succesHandlers = async (req, res) => {
    try {
        const info = req.query
        console.log(info)
        const infoJson = JSON.stringify(info)

        res.status(200).redirect(`https://techtrove-front.vercel.app/paymentsucces/?data=${encodeURIComponent(infoJson)}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = succesHandlers;