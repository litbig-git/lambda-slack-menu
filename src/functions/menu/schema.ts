export default {
    type: "object",
    properties: {
        menu: { type: 'string' },
        text: { type: 'string' }
    },
    required: ['menu', 'text']
} as const;
