"use client";

import { Button } from "@/shared/ui/button";

const INPUT_STYLES =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

/** mailto: 링크로 이메일 클라이언트를 열어 연락 */
function handleSendClick() {
  window.location.href = "mailto:momo_12@naver.com";
}

export function ContactForm() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">이름</label>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            className={INPUT_STYLES}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">이메일</label>
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            className={INPUT_STYLES}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">메시지</label>
          <textarea
            placeholder="메시지를 입력하세요"
            className={`${INPUT_STYLES} min-h-[120px] resize-none`}
          />
        </div>
        <Button className="w-full" onClick={handleSendClick}>
          보내기
        </Button>
      </div>
    </div>
  );
}
