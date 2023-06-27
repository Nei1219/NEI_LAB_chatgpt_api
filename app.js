const express = require("express")
const bodyParser = require("body-parser")
const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({
    apiKey: "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",
})
const openai = new OpenAIApi(configuration)

// 在 OpenAI 網站上設定 API key
// openai.api_key = ""

// 建立 Express app
const app = express()
app.use(bodyParser.json())

// 設定路由
app.post("/chat", async (req, res) => {
    try {
        // 從 POST request 取得用戶的輸入
        const input = req.body.input
        console.log(input)

        // 設定 GPT-3 設定和生成回覆
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: input,
            // maxTokens: 1024,
            // n: 1,
            // stop: null,
            // temperature: 0.7,
        })
        console.log(response.data.choices[0].text)

        // 回傳回覆
        res.json(response.data.choices[0].text)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: "Something went wrong" })
    }
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
})

// 啟動 server
app.listen(5005, () => {
    console.log("Server started on port 5005")
})
