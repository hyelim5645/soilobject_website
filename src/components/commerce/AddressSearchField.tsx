"use client";

import { useKakaoPostcodePopup } from "react-daum-postcode";

export function AddressSearchField({
  postalCode,
  address1,
  onSelect,
}: {
  postalCode: string;
  address1: string;
  onSelect: (result: { postalCode: string; address1: string }) => void;
}) {
  const openPostcodePopup = useKakaoPostcodePopup();

  function handleSearchClick() {
    openPostcodePopup({
      onComplete: (data) => {
        const address = data.roadAddress || data.jibunAddress || data.address;
        onSelect({ postalCode: data.zonecode, address1: address });
      },
    }).catch(() => {
      // Popup load failed (e.g. offline) — user can retry.
    });
  }

  return (
    <div>
      <label className="label-uppercase text-xs text-mist-500">우편번호 / 주소</label>
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={postalCode}
          readOnly
          placeholder="우편번호"
          className="w-32 border border-mist-300 bg-paper-dim px-3 py-2 text-sm text-ink"
        />
        <button
          type="button"
          onClick={handleSearchClick}
          className="label-uppercase shrink-0 border border-ink px-4 text-xs text-ink hover:bg-ink hover:text-paper"
        >
          주소 검색
        </button>
      </div>
      <input
        type="text"
        value={address1}
        readOnly
        placeholder="주소 검색 버튼을 눌러주세요"
        className="mt-2 w-full border border-mist-300 bg-paper-dim px-3 py-2 text-sm text-ink"
      />
    </div>
  );
}
