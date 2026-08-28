# Canasta 3.5.21 / MediaWiki 1.43.9, pinned to the 2026-08-24 multi-arch image.
FROM ghcr.io/canastawiki/canasta@sha256:bdf4ee1a2b24f4032f910f11937d7ac5799adad285511202776bc5feade70363

# Moderation is not bundled by Canasta. Pin the extension release/commit and
# install it alongside Canasta's immutable extensions.
ARG MODERATION_COMMIT=f0d423d11eb954ed7429d7618c1868303a5a5832
RUN git clone https://github.com/edwardspec/mediawiki-moderation.git /tmp/Moderation \
    && git -C /tmp/Moderation checkout "$MODERATION_COMMIT" \
    && rm -rf /tmp/Moderation/.git \
    && mv /tmp/Moderation /var/www/mediawiki/w/canasta-extensions/Moderation \
    && chown -R www-data:www-data /var/www/mediawiki/w/canasta-extensions/Moderation
