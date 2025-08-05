# AI Providers - Team Builder

Bu klasör AI sağlayıcıları için modüler yapıyı içerir. Yeni AI API'leri kolayca eklenebilir.

## 📁 Yapı

```
/server/api/providers/
├── types.ts              # Interface'ler ve type tanımları
├── factory.ts             # Provider factory (yeni provider eklemek için)
├── prompt-generator.ts    # Ortak prompt generator
├── openrouter.ts         # OpenRouter provider (aktif)
├── chatgpt.template.ts   # ChatGPT template (henüz aktif değil)
├── deepseek.template.ts  # DeepSeek template (henüz aktif değil)
└── index.ts              # Export dosyası
```

## 🚀 Yeni AI Provider Ekleme

### 1. Provider Class Oluştur

\`\`\`typescript
// /server/api/providers/yeni-provider.ts
import type { AIProvider, TeamBuildingConfig, Player } from './types';
import { generateTeamBuildingPrompt } from './prompt-generator';

export class YeniProviderProvider implements AIProvider {
name = 'yeni-provider';

async buildTeams(players: Player[], config: TeamBuildingConfig): Promise<string> {
if (!config.apiKey) {
throw new Error('Yeni Provider API key not configured');
}

    const prompt = generateTeamBuildingPrompt(players);

    const response = await fetch('https://api.yeni-provider.com/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${config.apiKey}\`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.model || 'default-model',
        messages: [
          {
            role: 'system',
            content: 'You are a football team builder. Return only valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: config.maxTokens || 500,
        temperature: config.temperature || 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(\`Yeni Provider API error: \${response.status} \${response.statusText}\`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from Yeni Provider API');
    }

    return aiResponse;

}
}
\`\`\`

### 2. Factory'ye Ekle

\`factory.ts\` dosyasını güncelle:

\`\`\`typescript
import { YeniProviderProvider } from './yeni-provider';

export function createAIProvider(providerName: string): AIProvider {
switch (providerName.toLowerCase()) {
case 'openrouter':
return new OpenRouterProvider();
case 'yeni-provider': // ← Buraya ekle
return new YeniProviderProvider();
// ...
}
}

export function getAvailableProviders(): string[] {
return [
'openrouter',
'yeni-provider', // ← Buraya ekle
// ...
];
}
\`\`\`

### 3. API Key Konfigürasyonu

\`ai-teams.post.ts\` dosyasındaki \`getApiKey\` fonksiyonunu güncelle:

\`\`\`typescript
function getApiKey(provider: string, config: any): string {
switch (provider.toLowerCase()) {
case 'openrouter':
return config.openrouterApiKey;
case 'yeni-provider': // ← Buraya ekle
return config.yeniProviderApiKey;
// ...
}
}
\`\`\`

### 4. Environment Variable

\`.env\` dosyasına API key ekle:

\`\`\`bash
NUXT_YENI_PROVIDER_API_KEY=your-api-key-here
\`\`\`

\`nuxt.config.ts\` dosyasına runtimeConfig ekle:

\`\`\`typescript
export default defineNuxtConfig({
runtimeConfig: {
openrouterApiKey: process.env.NUXT_OPENROUTER_API_KEY,
yeniProviderApiKey: process.env.NUXT_YENI_PROVIDER_API_KEY, // ← Buraya ekle
},
});
\`\`\`

### 5. Export Güncelle

\`index.ts\` dosyasını güncelle:

\`\`\`typescript
export { YeniProviderProvider } from './yeni-provider';
\`\`\`

## 🎯 Kullanım

Client tarafında yeni provider'ı kullan:

\`\`\`typescript
// Yeni provider ile team building
teams.value = await AITeamBuilderService.buildTeams(
players.value,
'yeni-provider', // ← Provider adı
{
model: 'premium-model',
temperature: 0.8,
maxTokens: 1000,
}
);
\`\`\`

## 📋 Şu An Aktif Olan Provider'lar

- ✅ **OpenRouter** - Mistral 7B Instruct (Free)
- ✅ **AIML API** - GPT-4o-mini (Free)

## 🔄 Gelecekte Eklenecek Provider'lar

- 🔄 **DeepSeek** - Template hazır
- 🔄 **ChatGPT** - Template hazır
- 🔄 **Gemini** - Template gerekiyor
- 🔄 **Claude** - Template gerekiyor## 🛠️ Template Dosyalar

\`\*.template.ts\` dosyaları hazır template'ler içerir. Aktif hale getirmek için:

1. \`.template.ts\` uzantısını kaldır
2. Factory'ye ekle
3. API key konfigürasyonu yap
4. Test et
