# 简要说明
这是一个使用了`openai`接口的基本`chatbot`实现。其中：

1. 前端使用了nextjs，后端使用了python，方法是flask。

2. 输出效果是流式输出(streaming)，即打字机效果。
3. 左侧”历史记录“还没做完，不过不影响使用，后续也会放出来完整版本。 

# 用法
新建一个.env文件，输入OPENAI_API_KEY。

## 安装依赖

```bash
pip install -r requirements.txt
```

## 运行前端

```bash
npm run dev
```

