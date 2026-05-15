// /services/api.js
export const api = {
  chat: async (message) => {
    const res = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: message }),
    })

    if (!res.ok) throw new Error("Chat failed")
    return res.json()
  },

  upload: async (formData) => {
    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!res.ok) throw new Error("Upload failed")
    return res.json()
  },
}