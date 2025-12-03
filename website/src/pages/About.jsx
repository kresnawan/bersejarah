import { Image } from "@heroui/react"
import fotoBersama from "../assets/fotobersama.jpg"

function About() {
  return (
    <div className='px-5 max-w-5xl mt-5 mb-20'>
      <div className="flex justify-center mb-10">
        <Image src={fotoBersama} radius="none" />
      </div>
      <p className="text-[12px] text-justify">
        Kabupaten Malang adalah daerah yang menjadi salah satu daya tarik turis utama di Jawa Timur. Salah satu daya tarik turismenya terletak pada wisata sejarah dan warisan budaya (heritage). Sebagai salah satu peradaban pertama di nusantara, Kabupaten Malang memiliki situs benda warisan budaya benda dan takbenda yang beragam. Di samping situs fisik, warisan budaya takbenda seperti tradisi dan seni-tari. Namun demikian keberadaan artefak ini tidak terdata secara maksimal. Tujuan utama dari kegiatan pengabdian masyarakat ini adalah untuk memberdayakan pegiat seni dan budaya lokal dalam melestarikan dan mempromosikan aset budaya mereka melalui teknologi digital.
      </p>
      <br />
      <p className="text-[12px] text-justify">
        Metodologi yang digunakan melibatkan pendekatan partisipatif, di mana komunitas dan akademisi berko-kreasi dalam pengumpulan, pemetaan lokasi (geotagging), dan verifikasi data detail situs budaya. Hasil penelitian menunjukkan bahwa penggunaan peta digital dapat meningkatkan kesadaran dan keterlibatan masyarakat dalam konservasi budaya, serta menyediakan platform yang mudah diakses bagi wisatawan dan peneliti. Kesimpulan dari studi ini menekankan pentingnya kolaborasi antara teknologi digital dan kearifan lokal untuk mendukung pelestarian warisan budaya di tingkat komunitas. Pengabdian ini adalah langkah awal dari satu proses kerja koloboratif yang melibatkan banyak pihak antara lain Dinas Pariwisata dan Kebudayaan Kabupaten Malang, pegiat seni budaya, dan Universitas Brawijaya.
      </p>
    </div>
  )
}

export default About