import React, { useState } from "react";
import {
  ChevronDown,
  MapPin,
  Phone,
  Users,
  GraduationCap,
  Star,
  Music,
  Heart,
  History,
} from "lucide-react";
import Mission from "../assets/about/mission.jpg";
import School from "../assets/home/home_image_2.jpg";
import Vision from "../assets/about/vision.jpg";
import watermark from "../assets/common/school_logo_transparent.png";
import Years100Logo from "../assets/common/100 transparent.png";
import Principal from "../assets/admin/principal.jpg";
import VicePrincipal from "../assets/admin/vice_principal.jpg";
import AsstPrincipal from "../assets/admin/asst_principal.jpg";
import PrimaryHead from "../assets/admin/primary_head.jpg";
import SecondaryHead from "../assets/admin/secondary_head.jpg";
import SchoolBuilding from "../assets/home/home_image_2.jpg";

const About = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const accordionData = [
    {
      // current admin
      title: "වත්මන් පරිපාලන කණ්ඩායම",
      icon: <Users className="w-6 h-6" />,
      content: (
        <div className="space-y-4 text-gray-700">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4 bg-white/50 p-4 rounded-lg shadow-sm">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                <img
                  src={Principal}
                  alt="Principal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-primary mb-2">
                  විදුහල්පති
                </h4>
                <p className="text-gray-600">එච්.ජී.රංජිත් කුමාර</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 bg-white/50 p-4 rounded-lg shadow-sm">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                <img
                  src={VicePrincipal}
                  alt="Vice Principal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-primary mb-2">
                  නියෝජ්‍ය විදුහල්පති
                </h4>
                <p className="text-gray-600">ඒ.ජී.චන්ද්‍රිකා ජයලත්</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 bg-white/50 p-4 rounded-lg shadow-sm">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                <img
                  src={AsstPrincipal}
                  alt="Assistant Principal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-primary mb-2">
                  සහකාර විදුහල්පති
                </h4>
                <p className="text-gray-600">ඩී.ඩී.නයනි ප්‍රසන්ත ලියනගේ</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 bg-white/50 p-4 rounded-lg shadow-sm">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                <img
                  src={PrimaryHead}
                  alt="Primary Head"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-primary mb-2">
                  ප්‍රාථමික අංශ ප්‍රධානතුමිය
                </h4>
                <p className="text-gray-600">එන්.ඩබ්.එම්. හිමාලි ඩයනා</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 bg-white/50 p-4 rounded-lg shadow-sm">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                <img
                  src={SecondaryHead}
                  alt="Secondary Head"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-primary mb-2">
                  ද්විතීයික අංශ ප්‍රධානතුමිය
                </h4>
                <p className="text-gray-600">එල්.ඕ.එම්.කේ.එස්.දමයන්ති</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "විදුහලට ජීවය දුන් ප්‍රමුඛයෝ (1925-2025)",
      icon: <History className="w-6 h-6" />,
      content: (
        <div className="space-y-6 text-gray-700">
          <div className="text-center mb-8">
            <p className="text-lg font-semibold text-primary">
              1925.06.16 දින සිට 2025.06.16 දින දක්වා
            </p>
            <p className="text-xl font-bold text-gray-800 mt-2">
              විදුහලට ජීවය දුන් ප්‍රමුඛයෝ..
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl space-y-4">
              <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">
                  ඩී.ඩී.ඒ. සේනානායක මහතා
                </p>
                <p className="text-sm text-gray-600">1925.06.16 සිට</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">බී.ඒ. ගුණසේකර මහතා</p>
                <p className="text-sm text-gray-600">
                  1937.06.10 සිට 1941.12.25 දක්වා
                </p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">
                  එන්.එම්. කරුණාරත්න මයා
                </p>
                <p className="text-sm text-gray-600">
                  1964.05.12 සිට 1968.05.05 දක්වා
                </p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">
                  එම්.ඩී.ඒ. ජයවර්ධන මයා
                </p>
                <p className="text-sm text-gray-600">1968.05.05 සිට</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">
                  කේ.එල්.එස්.ඒ. සහබන්ධු මයා
                </p>
                <p className="text-sm text-gray-600">
                  කේ.එල්.එස්.ඒ. සහබන්ධු මයා
                </p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">ඩබ්.කේ. අල්විස් මයා</p>
                <p className="text-sm text-gray-600">
                  1977.10.28 සිට 1979.02.21 දක්වා
                </p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">ඩබ්.ඒ. රූපරත්න මයා</p>
                <p className="text-sm text-gray-600">
                  1979.02.21 සිට 1981.07.01 දක්වා
                </p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">
                  ඊ.කේ හපුතන්ත්‍රී මයා
                </p>
                <p className="text-sm text-gray-600">
                  1981.07.01 සිට 1982.02.15 දක්වා
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl space-y-4">
              <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">එච්. පියුමාවතී මිය</p>
                <p className="text-sm text-gray-600">
                  1982.02.15 සිට 1985.06.09 දක්වා
                </p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">ඩී.වීරසේන මයා</p>
                <p className="text-sm text-gray-600">
                  1986.07.08 සිට 1990.02.19 දක්වා
                </p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">ඩී. මනම්පේරි මයා</p>
                <p className="text-sm text-gray-600">
                  1991.02.16 සිට 2003.01.01 දක්වා
                </p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">ඒ.ඩී. ගමගේ මිය</p>
                <p className="text-sm text-gray-600">
                  2003.01.02 සිට 2003.09.23 දක්වා
                </p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">එම්.පී. හේමපාල මයා</p>
                <p className="text-sm text-gray-600">2003.09.23 සිට</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">
                  පී.එච්.එස්.කේ. පියසේන මයා
                </p>
                <p className="text-sm text-gray-600">
                  2011.01.21 සිට 2018.05.14 දක්වා
                </p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">
                  පී.කේ.ඒ. ප්‍රියන්ත මයා
                </p>
                <p className="text-sm text-gray-600">
                  2018.05.14 සිට 2022.03.15 දක්වා
                </p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">
                  කේ.ජේ.එන්. විතාන මිය
                </p>
                <p className="text-sm text-gray-600">
                  2022.03.15 සිට 2024.03.03 දක්වා
                </p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">
                  එච්.ජී. රංජිත් කුමාර මයා
                </p>
                <p className="text-sm text-gray-600">2024.03.25 සිට අද දක්වා</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // school anthem
    {
      title: "පාසල් ගීතය",
      icon: <Music className="w-6 h-6" />,
      content: (
        <div className="relative bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-xl">
          {/* Watermark Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              src={watermark}
              alt="School Building Watermark"
              className="w-full h-full object-contain opacity-10"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary mb-2">
                විද්‍යාල ගීය
              </h3>
              <p className="text-sm text-gray-600">
                ප්‍රබන්ධය - විද්‍යාලයීය කීර්තිමත් ආදිශිෂ්‍ය, හිටපු දකුණු පළාත්
                අධ්‍යාපන අධ්‍යක්ෂ පියසේන අමරකීර්ති මැතිතුමා
              </p>
            </div>

            <div className="space-y-8 text-lg leading-relaxed text-center">
              <div className="bg-white/50 p-6 rounded-lg shadow-sm">
                <p className="text-gray-800 mb-4">ඉඳුනිල සේ රැස්වීදූ</p>
                <p className="text-gray-800 mb-4">සියදහසක් නෙත් පෑදූ</p>
                <p className="text-gray-800 mb-4">පිටදෙනි මහ විදුහල් මෑණී</p>
                <p className="text-gray-800">මුදුනත් බැඳ නමදිමි සාදූ..//</p>
              </div>

              <div className="bg-white/50 p-6 rounded-lg shadow-sm">
                <p className="text-gray-800 mb-4">තුන් හෙළයට පණ දුන් අපරාජිත</p>
                <p className="text-gray-800 mb-4">රුහුණේ දරුවන් පහසින් පූජිත</p>
                <p className="text-gray-800 mb-4">
                  ගාමිණි කැප්පෙටිපොළ පැරකුම්බා
                </p>
                <p className="text-gray-800">අභිමානී පුතු මද්දුමබණ්ඩා..//</p>
              </div>

              <div className="bg-white/50 p-6 rounded-lg shadow-sm">
                <p className="text-gray-800 mb-4">ගෝමී රාහුල කුමරතුඟුන් වැනි</p>
                <p className="text-gray-800 mb-4">
                  සක්විත්තන් දුටු තැන් වේ ජයබිම
                </p>
                <p className="text-gray-800 mb-4">
                  පැරදී නො වැටී එහි පිවිසෙන්නට
                </p>
                <p className="text-gray-800">වරම් දෙන්න මට විදුහල් මෑණී..//</p>
              </div>

              <div className="bg-white/50 p-6 rounded-lg shadow-sm">
                <p className="text-gray-800">ඉඳුනිල සේ රැස්වීදූ...//</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    //our hope
    {
      title: "අපේ පැතුම",
      icon: <Heart className="w-6 h-6" />,
      content: (
        <div className="space-y-4 text-gray-700">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg relative">
            {/* Watermark Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img 
                src={watermark} 
                alt="School Building Watermark" 
                className="w-full h-full object-contain opacity-10"
              />
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-center space-y-8">
              <p className="text-xl leading-relaxed">
                සිරි සරසවි නිතියෙන් රැඳුණු<br />
                සිරිත විරිත නැණ ගුණ වැඩුණු<br />
                සුවහසක් දූ පුතුන්<br />
                සිප්කිරෙන් පොසුන් කළ...
              </p>
              <p className="text-xl leading-relaxed">
                රිසි සේ දසත සරන්නට<br />
                සවිය පියාපත් දුන්...
              </p>
              <p className="text-xl leading-relaxed">
                මනැස දල්වා ඒකාලෝක කළ<br />
                සියවසක් අභිමුව<br />
                තුටු කඳුලු රැඳි දෙනෙතින්<br />
                මහාමේරුව වන්ව නො සැලී<br />
                නෙත් අයා සිටින්නී...
              </p>
              <p className="text-xl leading-relaxed">
                පිටදෙනි මහ විදුහල් ජනනී...
              </p>
              <p className="text-xl leading-relaxed">
                නිහඬ නිමල නුඹ මෙහෙවර<br />
                කප් සුවහස් කල්<br />
                විරාජමානව... යෙහෙන් වැජඹේවා...
              </p>
              <p className="text-2xl leading-relaxed font-semibold text-primary">
                චිරං ජයතු විදුහල් මවුනි ගරූ...!!!
              </p>
              <p className="text-base text-gray-600 mt-8">
                විද්‍යාලයීය විදුහල්පතිතුමා ප්‍රමුඛ අධ්‍යයන, අනධ්‍යයන කාර්ය මණ්ඩලයේ සුභපැතුම්...!!
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="about"
      className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen pt-20"
    >
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="text-4xl text-gray-600 font-bold leading-relaxed">
            1925 සිට 2025 දක්වා - සියවසක අභිමානවත් ගමනක්
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-800 to-orange-600 mx-auto mb-6"></div>
        </div>

        {/* School Beginning */}
        <div
          className="bg-white rounded-2xl shadow-[0_5px_30px_rgba(126,1,2,0.25)] p-8 mb-12 border 
        border-red-800/10 relative overflow-hidden"
        >
          <div className="absolute left-10 top-0 h-full w-1/2 opacity-10 pointer-events-none">
            <img
              src={watermark}
              alt="School Watermark"
              className="w-full h-full object-contain object-left"
            />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                විදුහලේ ආරම්භය
              </h2>
              <div className="space-y-6 text-gray-700">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border-l-4 border-red-800">
                  <p className="text-2xl font-bold text-red-800 mb-4">
                    1925.06.16 දින
                  </p>
                  <div className="text-xl leading-relaxed text-gray-800 space-y-6">
                    <p className="bg-white/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      රජයේ ආධාර ලබන බෞද්ධ පාඨශාලාවක් ලෙස{" "}
                      <strong className="font-semibold text-red-800">
                        අභය විද්‍යාලය
                      </strong>{" "}
                      නමින් ආරම්භ විය.
                    </p>
                    <p className="bg-white/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      ගහකොළ සපිරි මේ මනරම් භූමිභාගය මේ ප්‍රදේශයේ එවක දානපතියෙකු
                      වූ{" "}
                      <strong className="font-semibold text-red-800">
                        මුහන්දිරම් ඩී. අභයගුණවර්ධන
                      </strong>{" "}
                      මැතිතුමා විසින් පරිත්‍යාග කරන ලද අතර පාසලේ ආරම්භක කළමණාකරු
                      වූයේ ද එතුමාය. එතුමාගෙන් පසු ඔහු පුත්{" "}
                      <strong className="font-semibold text-red-800">
                        නීතීඥ ඩී.සී. අභයගුණවර්ධන
                      </strong>{" "}
                      මහතා කළමණාකාරධුරයට පත්විය.
                    </p>
                    <p className="bg-white/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      සිසුන් 48 දෙනෙකුගෙන් ඇරඹි මේ පාසලට ඇතුළත් වූ මුල්ම
                      ශිෂ්‍යයා{" "}
                      <strong className="font-semibold text-red-800">
                        ඕ.කේ. ජෝන්
                      </strong>{" "}
                      මහතාය.
                    </p>
                    <p className="bg-white/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      <strong className="font-semibold text-red-800">
                        ඩී.ඩී.ඒ. සේනානායක
                      </strong>{" "}
                      මහතා ආරම්භක විදුහල්පතිවරයා විය.
                    </p>
                    <p className="bg-white/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      මුල්වරට තනි ගොඩනැගිල්ලකින් ඇරඹි අප පාසල 1960 වසරේ දී රජයට
                      පවරාගත් අතර, 1964 වසරේ දී රජයේ වියදමින් පාසලට ගොඩනැගිල්ලක්
                      ලැබී ඇත. (වත්මන් ප්‍රධාන ශාලාව)
                    </p>
                    <p className="bg-white/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      එවක දකුණු පළාත් අධ්‍යාපන අධ්‍යක්ෂතුමියගේ උපදෙස් මත
                      1991.01.01 දින සිට{" "}
                      <strong className="font-semibold text-red-800">
                        ගා/පිටදෙනිය මහා විද්‍යාලය
                      </strong>{" "}
                      නමින් නම්කර ඇත.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-[0_10px_20px_rgba(126,1,2,0.3)] hover:shadow-[0_12px_24px_rgba(126,1,2,0.4)] transition-shadow duration-300">
                <img
                  src={School}
                  alt="School Building"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vision and Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-[0_2px_15px_rgba(126,1,2,0.22)] p-8 border border-red-800/10 hover:shadow-[0_4px_35px_rgba(126,1,2,0.5)] transition-shadow duration-300">
            <div className="text-center">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-6 shadow-md">
                <img
                  src={Vision}
                  alt="Vision"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-red-800/80 mb-4">
                අපගේ දැක්ම
              </h3>
              <p className="text-xl text-gray-700 font-semibold leading-relaxed">
                ගුණ නැණ බල සපිරි නියමුවන් බිහිකිරීම
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_2px_15px_rgba(126,1,2,0.2)] p-8 border border-red-800/10 hover:shadow-[0_4px_35px_rgba(126,1,2,0.5)] transition-shadow duration-300">
            <div className="text-center">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-6 shadow-md">
                <img
                  src={Mission}
                  alt="Mission"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-orange-600 mb-4">
                අපගේ මෙහෙවර
              </h3>
              <p className="text-xl text-gray-700 font-semibold leading-relaxed">
                ශ්‍රී ලාංකික සංස්කෘතිය හා ජාතික අනන්‍යතාවය ආරක්ෂා කරන,
                නිපුණතාවයන්ගෙන් හෙබි, සමතුලිත පෞර්ෂයෙන් යුත් දරු පිරිසක් රටට
                දායාද කිරීම
              </p>
            </div>
          </div>
        </div>

        {/* School Information */}
        <div className="bg-white rounded-2xl shadow-[0_2px_15px_rgba(126,1,2,0.2)] p-8 mb-12 border border-red-800/10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <MapPin className="mr-3 text-green-600" />
            විදුහල පිළිබඳ තොරතුරු
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-xl text-primary mb-3">
                මූලික තොරතුරු
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-base text-gray-500">විදුහලේ නම</p>
                  <p className="font-medium text-lg text-gray-700">
                    ගා/පිටදෙනිය මහා විද්‍යාලය
                  </p>
                </div>
                <div>
                  <p className="text-base text-gray-500">ලිපිනය</p>
                  <p className="font-medium text-lg text-gray-700">
                    පිටදෙනිය, ගොනාමුල්ල හන්දිය
                  </p>
                </div>
                <div>
                  <p className="text-base text-gray-500">දුරකතන අංකය</p>
                  <p className="font-medium text-lg text-gray-700">0912239679</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-xl text-primary mb-3">
                පාසල් විස්තර
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-base text-gray-500">පාසල් වර්ගය</p>
                  <p className="font-medium text-lg text-gray-700">1C</p>
                </div>
                <div>
                  <p className="text-base text-gray-500">පාසල් සංගණන අංකය</p>
                  <p className="font-medium text-lg text-gray-700">06269</p>
                </div>
                <div>
                  <p className="text-base text-gray-500">
                    විභාග දෙපාර්තමේන්තු අංකය
                  </p>
                  <p className="font-medium text-lg text-gray-700">0735</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-xl text-primary mb-3">
                පරිපාලන තොරතුරු
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-base text-gray-500">
                    ප්‍රාදේශීය ලේකම් කොට්ඨාසය
                  </p>
                  <p className="font-medium text-lg text-gray-700">වඳුරඹ</p>
                </div>
                <div>
                  <p className="text-base text-gray-500">
                    ග්‍රාම නිලධාරී කොට්ඨාසය
                  </p>
                  <p className="font-medium text-lg text-gray-700">
                    207A ඉහළකීඹිය දකුණ
                  </p>
                </div>
                <div>
                  <p className="text-base text-gray-500">මැතිවරණ කොට්ඨාසය</p>
                  <p className="font-medium text-lg text-gray-700">බද්දේගම</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-xl text-primary mb-3">
                අධ්‍යාපන තොරතුරු
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-base text-gray-500">අධ්‍යාපන කලාපය</p>
                  <p className="font-medium text-lg text-gray-700">ගාල්ල</p>
                </div>
                <div>
                  <p className="text-base text-gray-500">අධ්‍යාපන කොට්ඨාසය</p>
                  <p className="font-medium text-lg text-gray-700">බද්දේගම</p>
                </div>
                <div>
                  <p className="text-base text-gray-500">උසස්පෙළ අංශ</p>
                  <p className="font-medium text-lg text-gray-700">
                    කලා හා වාණිජ අංශ පමණි
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-xl text-primary mb-3">
                කාර්ය මණ්ඩල තොරතුරු
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-base text-gray-500">වත්මන් විදුහල්පතිතුමා</p>
                  <p className="font-medium text-lg text-gray-700">
                    එච්.ජී. රංජිත් කුමාර මයා (SLPS - 1)
                  </p>
                </div>
                <div>
                  <p className="text-base text-gray-500">අධ්‍යයන කාර්ය මණ්ඩලය</p>
                  <p className="font-medium text-lg text-gray-700">30</p>
                </div>
                <div>
                  <p className="text-base text-gray-500">අනධ්‍යයන කාර්ය මණ්ඩලය</p>
                  <p className="font-medium text-lg text-gray-700">04</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-xl text-primary mb-3">
                ශිෂ්‍ය තොරතුරු
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-base text-gray-500">
                    පාසලේ මුළු ශිෂ්‍ය සංඛ්‍යාව
                  </p>
                  <p className="font-medium text-lg text-gray-700">310</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {accordionData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-[0_2px_15px_rgba(126,1,2,0.2)] border border-red-800/10 overflow-hidden"
            >
              <button
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-red-800/10 transition-colors"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-red-800">{item.icon}</span>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {item.title}
                  </h3>
                </div>
                <ChevronDown
                  className={`text-gray-500 transition-transform duration-300 ${
                    openAccordion === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === index && (
                <div className="px-8 pb-6 pt-2 border-t border-gray-100">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Centenary Logo */}
        <div className="rounded-2xl bg-gradient-to-r from-red-800 via-red-800/90 to-orange-600 pb-8 text-center">
          <div className="relative w-full max-w-md mx-auto aspect-square rounded-lg overflow-hidden">
            <img
              src={Years100Logo}
              alt="100 Years Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-4xl text-white font-medium">
            සියවසක අභිමානවත් ගමනක් - 1925-2025
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
