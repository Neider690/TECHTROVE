const failureHandlers = async (req, res) => {
    try {
        const info = req.query
        console.log(info)
        const infoJson = JSON.stringify(info)

        res.status(200).redirect(`http://locoalhost:5173/paymentfailure/?data=${encodeURIComponent(infoJson)}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = failureHandlers;