import { modalState } from '../../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { CameraIcon } from '@heroicons/react/solid';
import { collection, addDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';

export default function Modal() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);

  // Firebaseにアップロード
  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);

    // ドキュメントの追加
    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: caption,
      profileImg: session.user.image,
      timestamp: serverTimestamp()
    });

    // 画像のstrage場所を指定
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    // 画像の更新
    await uploadString(imageRef, selectedFile, 'data_url').then(async snapshot => {
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, 'posts', docRef.id), {
        image: downloadURL
      });
    });

    // state系をリセット
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
    setCaption('');
  };

  // 画像を追加・選択
  const addImageToPost = e => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = readerEvent => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
          <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave=" ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block bg-white px-4 rounded-lg pt-5 pb-4 text-left overflow-hidden shadow-xl align-bottom transform transitio-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  {selectedFile ? (
                    // 画像が選択されていれば、画像を表示
                    <img
                      src={selectedFile}
                      alt=""
                      onClick={() => setSelectedFile(null)}
                      className=" w-full object-contain cursor-pointer"
                    />
                  ) : (
                    // カメラアイコン
                    <div
                      onClick={() => filePickerRef.current.click()}
                      className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                    >
                      <CameraIcon className="w-6 h-6 text-red-600" aria-hidden="true" />
                    </div>
                  )}
                  {/* タイトル */}
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Upload a Photo
                    </Dialog.Title>
                  </div>

                  {/* ファイル選択 */}
                  <div>
                    <input ref={filePickerRef} type="file" hidden onChange={addImageToPost} />
                  </div>

                  {/* テキストフィールド */}
                  <div className="mt-2">
                    <input
                      value={caption}
                      type="text"
                      className="border-none focus:ring-0 text-center w-full"
                      placeholder="Text"
                      onChange={e => setCaption(e.target.value)}
                    />
                  </div>

                  {/* アップロードボタン */}
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      disabled={!selectedFile}
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600  text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
                      onClick={uploadPost}
                    >
                      {loading ? 'Uploading...' : 'Upload Post'}
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
