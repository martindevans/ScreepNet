const VERSION = "_libnet_V001";
const NETWORK_SEGMENT_ID = 99;

// Memory map:
// [0:12] Version Prefix: "_libnet_VXXX"

// Open a foreign memory segment
function open_foreign(username)
{
    // Switch to listen to that user
    RawMemory.setActiveForeignSegment(username);

    // Check if we were already listening to that source
    const segment = RawMemory.foreignSegment;
    if (!segment) {
        return false;
    }
    if (segment.username != username) {
        return false;
    }

    return true;
}

// Open a local raw memory segment
function open_self()
{
    // Switch to listen to that user
    RawMemory.setActiveSegments([NETWORK_SEGMENT_ID]);

    // Check if that segment is already available
    if (!(NETWORK_SEGMENT_ID in RawMemory.segments)) {
        return false;
    }

    // Check if the segment needs to be setup for sending
    throw "Not Implemented: open_self";
}

// Send a message to the given destination
function try_send(destination, message)
{
    // Open the foreign segment for the given username, proceed if it was already open
    if (!open_self()) {
        return null;
    }

    throw "Not Implemented: send";
}

// Get a message from the source we're listening to
function try_receive(username)
{
    // Open the foreign segment for the given username, proceed if it was already open
    if (!open_foreign(username)) {
        return null;
    }

    // Check if any segment is available
    const data = RawMemory.foreignSegment.data;

    // Check if the version of the network system is compatible
    if (data.slice(0, 12) != VERSION) {
        return null;
    }

    throw "Not Implemented: try_receive"
}

// Initialise RawMemory segment `NETWORK_SEGMENT_ID` as public
function init()
{
    RawMemory.setPublicSegments([NETWORK_SEGMENT_ID]);
    RawMemory.setDefaultPublicSegment(NETWORK_SEGMENT_ID)
}

module.exports = {
    VERSION,
    NETWORK_SEGMENT_ID,

    init,
    open,
    try_send,
    try_receive,
};