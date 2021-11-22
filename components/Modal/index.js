import PropTypes from 'prop-types';

export default function Modal({
  message,
  handleLogout,
  showModal,
  setShowModal
}) {

  function handleClose(e) {
    e.stopPropagation();  //  <------ Here is the magic
    setShowModal({ type: 'hideModal' })
  }

  return (
    <>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>

                </div>
                {/* body */}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    {message}
                  </p>
                </div>
                {/* footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-textButton background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => handleClose(e)}
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-primary ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => { setShowModal({ type: 'hideModal' }); handleLogout() }}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null
      }
    </>
  );
}



Modal.propTypes = {
  message: PropTypes.string,
  affirmativeUsed: PropTypes.string
};



