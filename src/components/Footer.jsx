import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        <div>
          <h3 className="font-semibold mb-2">학원 정보</h3>
          <p>대구광역시 동구 아양로 123</p>
          <p>전화: 053-944-3355</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">소셜</h3>
          <div className="flex space-x-4">
            <a href="#">페이스북</a>
            <a href="#">인스타그램</a>
            {/* <a href="#">유튜브</a> */}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">저작권</h3>
          <p>© 2025 다모아 요리학원. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}